import mongoose from 'mongoose';

// Nombre de la colección en MongoDB
const cartCollection = 'carts';

// Esquema del carrito
const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true, versionKey: false });

// Crear el modelo basado en el esquema
const CartModel = mongoose.model(cartCollection, cartSchema);

export default CartModel;