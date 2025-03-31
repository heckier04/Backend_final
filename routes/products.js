import { Router } from 'express';
import ProductModel from '../models/products.models.js'; // Modelo de productos
import { validateInputProducts } from '../middlewares/validation.js'; // Middleware para validar la entrada

const router = Router();

// 📌 Obtener todos los productos
router.get('/', async (_req, res) => {
  try {
    const products = await ProductModel.find(); // Obtiene todos los productos desde MongoDB
    res.json(products);
  } catch (error) {
    console.error("❌ Error al obtener los productos:", error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// 📌 Obtener un producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid); // Busca el producto por ID
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error("❌ Error al obtener el producto:", error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// 📌 Crear un nuevo producto
router.post('/', validateInputProducts, async (req, res) => {
  try {
    const { code } = req.body;

    // Verifica si el código del producto ya existe
    const existingProduct = await ProductModel.findOne({ code });
    if (existingProduct) {
      return res.status(400).json({ error: "El código del producto ya existe" });
    }

    // Crea un nuevo producto
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error al crear el producto:", error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// 📌 Actualizar un producto por ID
router.put('/:pid', validateInputProducts, async (req, res) => {
  try {
    const { code } = req.body;

    // Verifica si el producto existe
    const product = await ProductModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Verifica que, si se envía un código nuevo, no esté ya en uso por otro producto
    if (code && code !== product.code) {
      const existingProduct = await ProductModel.findOne({ code });
      if (existingProduct) {
        return res.status(400).json({ error: "El código ya está en uso por otro producto" });
      }
    }

    // Actualiza el producto
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      req.body,
      { new: true } // Devuelve el producto actualizado
    );
    res.json({ message: "✅ Producto actualizado con éxito", product: updatedProduct });
  } catch (error) {
    console.error("❌ Error al actualizar el producto:", error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// 📌 Eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.pid); // Elimina el producto por ID
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json({ message: "✅ Producto eliminado", deletedProduct });
  } catch (error) {
    console.error("❌ Error al eliminar el producto:", error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
