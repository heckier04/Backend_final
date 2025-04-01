import mongoose from 'mongoose';

// Nombre de la colección en MongoDB
const productCollection = 'products';

// Esquema del producto
const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: [
        {
            type: String,
            required: true
        }
    ]
}, { timestamps: true, versionKey: false });

// Crear el modelo basado en el esquema
const ProductModel = mongoose.model(productCollection, productSchema);

export default ProductModel;