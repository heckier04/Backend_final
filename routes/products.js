import { Router } from 'express';
import ProductModel from '../models/products.models.js';
import { validateInputProducts } from '../middlewares/validation.js';
import { isValidObjectId } from 'mongoose';

const router = Router();

// 📌 Obtener todos los productos
router.get('/', async (_req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error("❌ Error en GET /api/products:", error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// 📌 Obtener un producto por ID
router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  if (!isValidObjectId(pid)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const product = await ProductModel.findById(pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error("❌ Error en GET /api/products/:pid:", error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// 📌 Crear un nuevo producto
router.post('/', validateInputProducts, async (req, res) => {
  try {
    const { code } = req.body;

    const existingProduct = await ProductModel.findOne({ code });
    if (existingProduct) {
      return res.status(400).json({ error: "El código del producto ya existe" });
    }

    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error en POST /api/products:", error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// 📌 Actualizar un producto por ID
router.put('/:pid', validateInputProducts, async (req, res) => {
  const { pid } = req.params;
  if (!isValidObjectId(pid)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const { code } = req.body;

    const product = await ProductModel.findById(pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (code && code !== product.code) {
      const existingProduct = await ProductModel.findOne({ code });
      if (existingProduct) {
        return res.status(400).json({ error: "El código ya está en uso por otro producto" });
      }
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(pid, req.body, { new: true });
    res.json({ message: "✅ Producto actualizado con éxito", product: updatedProduct });
  } catch (error) {
    console.error("❌ Error en PUT /api/products/:pid:", error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// 📌 Eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  if (!isValidObjectId(pid)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(pid);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json({ message: "✅ Producto eliminado", deletedProduct });
  } catch (error) {
    console.error("❌ Error en DELETE /api/products/:pid:", error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
