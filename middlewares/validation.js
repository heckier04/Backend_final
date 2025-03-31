// middlewares/validation.js
export const validateInputCarts = (req, res, next) => {
  const { cid, pid } = req.params;

  if (isNaN(Number(cid)) || isNaN(Number(pid))) {
    return res.status(400).json({ error: 'El ID del carrito y del producto deben ser números válidos' });
  }

  next();
};

export function validateInputProducts(req, res, next) {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  if (!title || !description || !code || price === undefined || status === undefined || stock === undefined || !category || !thumbnails) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  if (typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof category !== 'string') {
    return res.status(400).json({ error: 'Los campos title, description, code y category deben ser cadenas de texto' });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'El campo price debe ser un número mayor a 0' });
  }

  if (typeof status !== 'boolean') {
    return res.status(400).json({ error: 'El campo status debe ser un valor booleano' });
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({ error: 'El campo stock debe ser un número entero mayor o igual a 0' });
  }

  if (!Array.isArray(thumbnails) || thumbnails.some((url) => typeof url !== 'string')) {
    return res.status(400).json({ error: 'El campo thumbnails debe ser un array de cadenas de texto (URLs)' });
  }

  next();
}

