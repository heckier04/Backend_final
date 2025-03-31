
const useName = process.env.userMongoDB;
const password = process.env.password;  // Nueva variable de entorno para la contraseña

export const config = {
  PORT: process.env.PORT || 8080, 
  db:{  // Si hay una variable de entorno PORT, se usará; si no, se usa 8080
  connectionString: `mongodb+srv://${useName}:${password}@cluster0.gfmot.mongodb.net/backend_final=true&w=majority` },

};
