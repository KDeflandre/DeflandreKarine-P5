async function allProducts() {
    try {
      const response = await axios.get('http://localhost:3000/api/products/');
      console.log("product are ok");
      return response
    } 
    catch (error) {
      console.error(error);
      return []
    }
  }

  var response = [];
    
  response.forEach(product => {
      let productId = product.id;
      let productImg = product.imageUrl;
      let productAltTxt = product.altTxt;
      let productName = product.name;
      let productDescription = product.desription;
      var productContainer = document.getElementById("items");
      
        productContainer.insertAdjacentHTML('beforeEnd',
        "<img src=${productImg}>",
        "<h3>${productName}</h3>",
        "<p>${productDescription}</p>");
   })