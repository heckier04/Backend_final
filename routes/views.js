import { Router } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();
const filePath = path.resolve('data', 'products.json');

// 📌 Función para leer productos
const readFile = () => {
try {
if (!fs.existsSync(filePath)) return [];
return JSON.parse(fs.readFileSync(filePath, 'utf-8')) || [];
} catch (error) {
console.error("❌ Error al leer products.json:", error);
return [];
}
};

// 📌 Ruta principal (Index)
router.get('/', (_req, res) => {
const products = readFile();
res.render('index', { products }); // 📌 Usa index.handlebars como página principal
});

// 📌 Vista de productos estática con Handlebars
router.get('/products', (_req, res) => {
const products = readFile();
res.render('index', { products }); // 📌 Ahora usa 'index'
});

// 📌 Vista en tiempo real con WebSockets
router.get('/realtimeproducts', (_req, res) => {
res.render('realTimeProducts');
});

export default router;

