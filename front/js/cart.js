// Local storage
const cart = JSON.parse(localStorage.getItem("cart"));
const allProduct = document.getElementById("cart__items")
console.table(cart);


// Récup des produits avec l'API et insertion de ceux-ci dans la page
if (cart === null || cart == 0 ) {
   allProduct.innerHTML = "<h1>--- Votre panier est vide ---</h1>"; 
   allProduct.style["color"] = "yellow" ;
  
  } else {
for (let idProduct in cart) {
fetch("http://localhost:3000/api/products/" + idProduct)
  .then((responseProduct) => responseProduct.json())
  .then(product => {
      for (let color in cart[idProduct]) {
          allProduct.insertAdjacentHTML('beforeend',
            `<article class="cart__item" data-id="${idProduct}" data-color="${product-color}">
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
});
}
}

// Récup du total des quantités 
function cartTotal() {

var itemQtt = document.getElementsByClassName("itemQuantity");
var length = itemQtt.length,
resultQuantity = 0;

for (var i = 0; i < length; ++i) {
  resultQuantity += itemQtt[i].valueAsNumber;
}

let finalQuantity = document.getElementById("totalQuantity");
finalQuantity.innerHTML = resultQuantity;
console.log(resultQuantity);

// Récup prix total 
resultPrice = 0;

for (var i = 0; i <length; ++i) {
  resultPrice += (Qtt[i].valueAsNumber * cart[i].productPrice);
}

let finalPrice = document.getElementById("totalPrice")
finalPrice.innerHTML = resultPrice;

}
cartTotal();