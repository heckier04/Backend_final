import { Router } from 'express';
import ProductModel from '../models/products.models.js'; // Modelo de productos

const router = Router();

// 📌 Ruta principal (Index)
router.get('/', async (_req, res) => {
  try {
    const products = await ProductModel.find(); // Obtiene los productos desde MongoDB
    res.render('index', { products }); // Renderiza la vista principal con los productos
  } catch (error) {
    console.error("❌ Error al obtener los productos:", error);
    res.status(500).send('Error al cargar los productos');
  }
});

// 📌 Vista de productos estática con Handlebars
router.get('/products', async (_req, res) => {
  try {
    const products = await ProductModel.find(); // Obtiene los productos desde MongoDB
    res.render('index', { products }); // Renderiza la vista con los productos
  } catch (error) {
    console.error("❌ Error al obtener los productos:", error);
    res.status(500).send('Error al cargar los productos');
  }
});

// 📌 Vista en tiempo real con WebSockets
router.get('/realtimeproducts', async (_req, res) => {
  try {
    const products = await ProductModel.find(); // Obtiene los productos desde MongoDB
    res.render('realTimeProducts', { products }); // Renderiza la vista en tiempo real
  } catch (error) {
    console.error("❌ Error al obtener los productos:", error);
    res.status(500).send('Error al cargar los productos');
  }
});

export default router;

