import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import initApp from './app/index.js';
import { config } from './config/index.js';
import { initMongoAtlas } from './db/index.js';
import ProductModel from './models/products.models.js';

const app = initApp();
const server = http.createServer(app);
const io = new Server(server);

// Conexión a MongoDB
initMongoAtlas();

// Configuración del WebSocket
io.on('connection', async (socket) => {
  console.log('🟢 Cliente conectado');

  try {
    // Enviar productos actuales al cliente
    const products = await ProductModel.find();
    socket.emit('updateProducts', products);
  } catch (error) {
    console.error("❌ Error al obtener los productos:", error);
    socket.emit('error', { message: 'Error al obtener los productos' });
  }

  // Evento para agregar un nuevo producto
  socket.on('newProduct', async (product) => {
    if (!product.title || !product.price) {
      return socket.emit('error', { message: 'El título y el precio son obligatorios' });
    }

    try {
      const newProduct = new ProductModel(product);
      await newProduct.save();
      const products = await ProductModel.find();
      io.emit('updateProducts', products);
    } catch (error) {
      console.error("❌ Error al agregar el producto:", error);
      socket.emit('error', { message: 'Error al agregar el producto' });
    }
  });

  // Evento para eliminar un producto
  socket.on('deleteProduct', async (id) => {
    try {
      await ProductModel.findByIdAndDelete(id);
      const products = await ProductModel.find();
      io.emit('updateProducts', products);
    } catch (error) {
      console.error("❌ Error al eliminar el producto:", error);
      socket.emit('error', { message: 'Error al eliminar el producto' });
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado');
  });
});

// Iniciar servidor
server.listen(config.PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
});
