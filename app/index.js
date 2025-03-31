import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { ProductsRouter, CartsRouter, ViewsRouter } from '../routes/index.js';
import { logger } from '../middlewares/logger.js';
import 'dotenv/config';

const initApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger);

  // 📌 Configurar Handlebars
  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', path.resolve('views'));

  // 📌 Servir archivos estáticos (CSS, JS en el frontend)
  app.use(express.static(path.resolve('public')));

  // 📌 Rutas principales
  app.use('/api/products', ProductsRouter);
  app.use('/api/carts', CartsRouter);
  app.use('/', ViewsRouter);

  // 📌 Middleware para manejo de errores
  app.use(function (err, _req, res, _next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  return app;
};

export default initApp;
