
 allProducts (); 

 NewProducts ();

  // Test V2 recup produits
  async function allProducts () {
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
// Création et ajout des produits dans le DOM 

  async function NewProducts () {
    let result = await allProducts ()
    .then( (responseProducts) => {
      for (let i=0; i < responseProducts.length; i++) {		

       // ajout a 
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.htlm?id=${responseProducts[i]._id}`;

        // ajout article
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        // ajout image du produit
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = responseProducts[i].imageUrl;
        productImg.alt = responseProducts[i].imageUrl;

        // ajout du titre du produit avec H3 
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = responseProducts[i].name;

        // ajout de la description avec p 
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.innerHTML = responseProducts[i].description;

    }
});
console.log("Product are integrated");
}
    



