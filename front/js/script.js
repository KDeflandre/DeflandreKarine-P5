
// //Récupération des produits 

// var allProducts = [];

// const getProducts = async () => {
//     await fetch('http://localhost:3000/api/products/')
//     .then ((res) => res.json())
//     .then ((promiseProduct) => {
//         allProducts = promiseProduct; 
//     }); 
// };

// // Affichage des produits 

// const displayProducts = async () => {
//     await getProducts();
// };

// displayProducts ();


// code de Cyril 


  async function allProducts() {
    try {
      const response = await axios.get('http://localhost:3000/api/products/');
      return response
    } 
    catch (error) {
      console.error(error);
      return []
    }
  }

// () => function allProducts() {

// }
    allProducts ()
    var allProducts = []
   
    allProducts = [
        {id: 28, imageUrl: "/toto.png", name: "toto", price: 29.99},     
        {id: 42, imageUrl: "/tata.png", name: "tata", price: 59.99},
        {id: 42, imageUrl: "/tata.png", name: "tata", price: 59.99}
      ]
  
    allProducts.forEach(product => {
        let productId = product.id;
        let productImg = product.imageUrl;
        let productImgAlt = product.imageAlt;
        let productName = product.name;
        let productDescription = product.desription;
        var productContainer = document.getElementById("items");
      
        productContainer.insertAdjacentHTML('beforeEnd',
        "<img src=${productImg}>",
        "<h3>${productName}</h3>",
        "<p>${productDescription}</p>");
    })
   
    const newElt = document.createElement("article");
    let elt = document.getElementById("items");
    elt.appendChild(newElt);
    testtes