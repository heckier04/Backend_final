export const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    // Registro de información de la solicitud y respuesta
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });

  // Registrar el cuerpo de la solicitud solo si existe y no es una solicitud GET
  if (req.body && Object.keys(req.body).length > 0 && req.method !== 'GET') {
    console.debug('Request Body:', req.body);
  }

  next();
};
