document.addEventListener('DOMContentLoaded', () => {
  // Conexión al servidor WebSocket
  const socket = io();

  // 📌 Escuchar la actualización de productos desde el servidor
  socket.on('updateProducts', (products) => {
    console.log('📢 Productos actualizados:', products);
    updateProductList(products);
  });

  // 📌 Escuchar errores desde el servidor
  socket.on('error', (error) => {
    console.error('❌ Error recibido del servidor:', error.message);
    alert(`Error: ${error.message}`);
  });

  // 📌 Función para actualizar la lista de productos en el DOM
  function updateProductList(products) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = products.map(product => `
      <li>
        <strong>${product.title}</strong> - $${product.price}
        <button onclick="deleteProduct('${product._id}')">🗑️ Eliminar</button>
      </li>
    `).join('');
  }

  // 📌 Capturar el evento de envío del formulario para agregar un producto
  const productForm = document.getElementById('product-form');
  productForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const title = document.getElementById('title').value.trim();
    const price = parseFloat(document.getElementById('price').value);

    if (!title || isNaN(price) || price <= 0) {
      alert('Por favor, ingresa un título válido y un precio mayor a 0.');
      return;
    }

    // Enviar el nuevo producto al servidor
    socket.emit('newProduct', { title, price });

    // Limpiar el formulario
    productForm.reset();
  });

  // 📌 Función para eliminar un producto
  function deleteProduct(productId) {
    // Enviar el ID del producto al servidor para eliminarlo
    socket.emit('deleteProduct', productId);
  }
});
