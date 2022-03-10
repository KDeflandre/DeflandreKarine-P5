// Local storage
const cart = JSON.parse(localStorage.getItem("cart"));
const allProduct = document.getElementById("cart__items")
var priceTable = {}

// Récup des produits avec l'API et insertion de ceux-ci dans la page
function udpateCart() {
if (cart === null || cart == 0) {
  allProduct.innerHTML = "<h1>--- Votre panier est vide ---</h1>";
  allProduct.style["color"] = "yellow";
} else {
  let i = 0;
  for (let idProduct in cart) {
    fetch("http://localhost:3000/api/products/" + idProduct)
      .then((responseProduct) => responseProduct.json())
      .then(product => {
        for (let color in cart[idProduct]) {
          allProduct.insertAdjacentHTML('beforeend',
            `<article class="cart__item" data-id="${idProduct}" data-color="${product - color}">
                <div class="cart__item__img">
                <img src="${product.imageUrl}" 
                alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[idProduct][color]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`);
        }
        priceTable[idProduct] = product.price
        cartTotal()
      });
  }
}
}

// Récup du total des quantités 
function cartTotal() {
  let totalArticles = 0
  let totalPrice = 0

  for (let idProduct in cart) {
    for (let color in cart[idProduct]) {
      totalArticles += cart[idProduct][color]

      if (priceTable[idProduct]) {
        totalPrice += priceTable[idProduct] * cart[idProduct][color]
      }
    }
  }

  let finalQuantity = document.getElementById("totalQuantity");
  finalQuantity.innerHTML = totalArticles;

  let finalPrice = document.getElementById("totalPrice")
  finalPrice.innerHTML = totalPrice;
}

udpateCart()


function deleteArticle() {
  const btnDelete = document.querySelectorAll(".deleteItem");
  console.log(btnDelete);
  
  for (let i = 0; i < btnDelete.length; i++){
    btnDelete[i].addEventListener("click", (event) => {
      event.preventDefault();
      console.log(event);
  
      let idDelete = cart[i].idProduct;
      let colorDelete = cart[i].colors;
    
      // filter 
      cart = cart.filter(el => el.idProduct !== idDelete || el.colors !== colorDelete);
      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));


      // alert produit supp + refresh
      alert("Le produit a été supprimé du panier");
      udpateCart()
    })
  }
}

deleteArticle()

// Modification d'une quantité de produit
function changeQtt() {

  let articleQuantity = document.querySelectorAll(".itemQuantity");
  let articleQuantityValue = cart[idProduct][color];

  for (let i = 0; i < articleQuantity.length; i++){
    articleQuantity[i].addEventListener("change", (event) => {
          event.preventDefault();
          console.log(event);

          let articleQuantityChange = cart[i].articleQuantityValue;
          let articleQuantityValue = articleQuantity[i].valueAsNumber;
          
          const resultFind = cart.find((el) => el.qttModifValue !== articleQuantityChange);

          resultFind.articleQuantityValue = articleQuantityValue;
          cart[i].articleQuantityValue = resultFind.cart[idProduct][color];

          localStorage.setItem("cart", JSON.stringify(cart));
      
          udpateCart();
      })
  }
}
changeQtt();