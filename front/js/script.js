
 NewProducts();

// Recup produits

  async function allProducts() {
  try {
    let responseProducts = await fetch('http://localhost:3000/api/products/');
      console.log("Products are ok =)")
      return responseProducts.json();
  }
  catch (error) {
    console.error(error);
    return []
      }
    }
    
  // Création des produits

async function NewProducts() {
  await allProducts()
    .then((responseProducts) => {
      const productContainer = document.getElementById("items")
      responseProducts.forEach(product => {
        productContainer.insertAdjacentHTML('beforeend', 
        `<a href="product.html?id=${product._id}">
        <article>
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>
        </a>`);
      });
    });
  console.log("Product are integrated");
}