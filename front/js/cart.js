// Local storage
const cart = JSON.parse(localStorage.getItem("cart"));
const allProduct = document.getElementById("cart__items")
var priceTable = {}

// Récup des produits avec l'API et insertion de ceux-ci dans la page
function udpateCart() {
  allProduct.innerHTML = "";
  if (cart === null || Object.keys(cart).length == 0) {
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
              `<article class="cart__item" data-id="${idProduct}" data-color="${color}">
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[idProduct][color]}" onchange="changeQty(this)">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="deleteItem(this)">Supprimer</p>
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

function deleteItem(target) {
  let parent = target.closest("article");

  let idDelete = parent.dataset.id;
  let colorDelete = parent.dataset.color;

  delete cart[idDelete][colorDelete]
  if (Object.keys(cart[idDelete]).length == 0) {
    delete cart[idDelete]
  }
  localStorage.setItem("cart", JSON.stringify(cart));


  // alert produit supp + refresh
  alert("Le produit a été supprimé du panier");
  udpateCart()
}

// Modification d'une quantité de produit
function changeQty(target) {
  let parent = target.closest("article");

  let idProduct = parent.dataset.id;
  let color = parent.dataset.color;
  let newQty = parseInt(target.value);

  cart[idProduct][color] = newQty

  localStorage.setItem("cart", JSON.stringify(cart));

  udpateCart()
}
udpateCart()

//****************************** Formulaire **********************************************//

function testField(input, word, regex) {
  let errorMsg = input.nextElementSibling;

  if (input.value == "") {
    errorMsg.innerHTML = `Veuillez renseigner votre ${word}`;
    return false;
  } else {
    if (regex.test(input.value)) {
      errorMsg.innerHTML = "";
      return true;
    } else {
      errorMsg.innerHTML = "Ce champ n'est pas au format attendu.";
      return false;
    }
  }
}

function validateForm() {
  let form = document.querySelector(".cart__order__form");
  let errorCount = 0;

  // Expression regulières
  let emailRegex = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
  let infoRegex = new RegExp("^[a-zA-Z ,.'-][-a-zA-Zàâäéèêëïîôöùûüç]+$");
  let addressRegex = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  // Modif du formulaire 
  if (!testField(form.firstName, "prénom", infoRegex)) errorCount++;
  if (!testField(form.lastName, "nom", infoRegex)) errorCount++;
  if (!testField(form.address, "adresse", addressRegex)) errorCount++;
  if (!testField(form.city, "ville", infoRegex)) errorCount++;
  if (!testField(form.email, "email", emailRegex)) errorCount++;

  return errorCount == 0;
}

// Envoi des infos au localstorage
function postForm() {
  const btnOrder = document.getElementById("order");
  btnOrder.addEventListener("click", (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    }
    const sendOrder = {
      contact,
      products: Object.keys(cart)
    }

    const options = {
      method: "POST",
      body: JSON.stringify(sendOrder),
      headers: {
        "Content-Type": "application/json",
      }
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
        document.location.href = 'confirmation.html?orderId=' + data.orderId;
      });
  });

};

postForm();