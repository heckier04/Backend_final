import http from 'http';
import { Server } from 'socket.io';
import initApp from './app/index.js';
import { config } from './config/index.js';
import fs from 'fs';
import path from 'path';
import { initMongoAtlas } from './db/index.js'

const app = initApp();
const server = http.createServer(app);
const io = new Server(server);
initMongoAtlas()
// 📌 Configuración del WebSocket
const filePath = path.resolve('data', 'products.json');
const readFile = () => (fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : []);

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado');

  socket.emit('updateProducts', readFile());

  socket.on('newProduct', (product) => {
    const products = readFile();
    const newProduct = { id: Date.now().toString(), ...product };
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    io.emit('updateProducts', products);
  });

  socket.on('deleteProduct', (id) => {
    let products = readFile().filter((product) => product.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    io.emit('updateProducts', products);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado');
  });
});

// 📌 Pasar `io` a la app para que lo use `views.js`
app.set('socketio', io);

// 📌 Iniciar servidor
server.listen(config.PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
});
