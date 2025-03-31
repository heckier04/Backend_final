import {connect} from 'mongoose';
import { config } from '../config/index.js';

export const initMongoAtlas = async () => {
  try {
    console.log('Intentando conectar a MongoDB con:', config.db.connectionString);
    await connect(config.db.connectionString);
    console.log('✅ Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1); // Finaliza el proceso si no se puede conectar
  }
};