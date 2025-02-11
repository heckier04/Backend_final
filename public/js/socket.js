const socket = io();

// Escuchar la actualización de productos
socket.on('updateProducts', (products) => {
  console.log('📢 Productos actualizados:', products);
  updateProductList(products);
});

// Función para actualizar la lista en el DOM
function updateProductList(products) {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  productList.innerHTML = products.map(product => `
    <li>${product.name} - $${product.price}</li>
  `).join('');
}
