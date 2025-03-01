<<<<<<< HEAD
# villanti_backend_FiNAL
=======
📦 Proyecto de E-commerce con Express y Handlebars

🚀 Descripción

Este proyecto es una API de e-commerce desarrollada con Express.js y Handlebars para la visualización de productos. Además, utiliza WebSockets para la actualización en tiempo real de los productos.
🛠️ Endpoints

📌 Productos (/api/products)

Método

Ruta

Descripción

GET

/api/products

Obtiene todos los productos

GET

/api/products/:id

Obtiene un producto por su ID

POST

/api/products

Crea un nuevo producto

PUT

/api/products/:id

Actualiza un producto por su ID

DELETE

/api/products/:id

Elimina un producto por su ID

📌 Carritos (/api/carts)

Método

Ruta

Descripción

GET

/api/carts

Obtiene todos los carritos

GET

/api/carts/:id

Obtiene un carrito por su ID

POST

/api/carts

Crea un nuevo carrito

POST

/api/carts/:id

Agrega un producto al carrito

DELETE

/api/carts/:id

Vacía un carrito por su ID

📌 Vistas (/)

Método

Ruta

Descripción

GET

/products

Página con la lista de productos

GET

/realtimeproducts

Vista en tiempo real con WebSockets

🔌 WebSockets

La aplicación utiliza WebSockets para actualizar la vista en tiempo real cuando se agregan o eliminan productos.

📜 Licencia

Este proyecto está bajo la licencia Coder.

