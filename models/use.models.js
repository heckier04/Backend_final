import mongoose from 'mongoose';

const userCollection = 'viajes';

const userSchema = new mongoose.Schema({
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

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;