import { Router } from 'express';
import CartModel from '../models/carts.models.js'; // Modelo de carritos
import ProductModel from '../models/products.models.js'; // Modelo de productos

const router = Router();

// 📌 Crear un nuevo carrito
router.post('/', async (_req, res) => {
  try {
    console.log("🛒 Creando un nuevo carrito...");
    const newCart = new CartModel({ products: [] }); // Crea un carrito vacío
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    console.error("❌ Error al crear el carrito:", error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// 📌 Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    console.log(`🔍 Buscando carrito con ID: ${req.params.cid}`);
    const cart = await CartModel.findById(req.params.cid).populate('products.product'); // Poblamos los productos
    if (!cart) {
      console.log("❌ Carrito no encontrado");
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    console.error("❌ Error al obtener el carrito:", error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// 📌 Agregar un producto a un carrito existente
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    console.log(`🛍 Agregando producto ${req.params.pid} al carrito ${req.params.cid}...`);

    // Verifica si el carrito existe
    const cart = await CartModel.findById(req.params.cid);
    if (!cart) {
      console.log("❌ Carrito no encontrado");
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Verifica si el producto existe
    const product = await ProductModel.findById(req.params.pid);
    if (!product) {
      console.log("❌ Producto no encontrado");
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verifica si el producto ya está en el carrito
    const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1; // Incrementa la cantidad
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 }); // Agrega el producto al carrito
    }

    await cart.save(); // Guarda los cambios en el carrito
    res.status(201).json(cart);
  } catch (error) {
    console.error("❌ Error al agregar el producto al carrito:", error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

export default router;
