// Lien du produit vers la page produit + id produit 
let params = (new URL(window.location.href)).searchParams;
const idProduct = params.get("id");

// Récup de l'id du produit + chargement du produit avec ses caractéristiques
loadProduct();
  async function loadProduct() {
  await fetch("http://localhost:3000/api/products/" + idProduct)
  .then((responseProduct) => responseProduct.json())
  .then(product => { 
  let item = document.querySelector(".item");
  item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl}" 
  alt="${product.altTxt}">`);
  item.querySelector("#title").innerHTML = product.name;
  item.querySelector("#price").innerHTML = product.price;
  item.querySelector("#description").innerHTML = product.description;

  // Ajout des couleurs possibles 
  product.colors.forEach(color => {
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = color;
    productColors.innerHTML = color;
    });
  })
}

// Mise au panier 
const btnAddToCart = document.querySelector("#addToCart");
btnAddToCart.addEventListener("click", addToCart);

function addToCart() {
  // Vérif que la couleur et les quantités ont bien été choisies
  const quantitySelect = parseInt(document.querySelector("#quantity").value);
  const colorSelect = document.querySelector("#colors").value;
  
  if (quantitySelect > 0 && quantitySelect <=100 && colorSelect != "") { 
    var cart = {}
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));

      if (cart.hasOwnProperty(idProduct)) {
        if (cart[idProduct].hasOwnProperty(colorSelect)) {
          cart[idProduct][colorSelect] += quantitySelect
        } else {
          cart[idProduct][colorSelect] = quantitySelect
        }
      } else {
        cart[idProduct] = {
          [colorSelect]: quantitySelect
        }
      }
    } else {
      cart = {
        [idProduct]: {
          [colorSelect]: quantitySelect
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    
    // alert produit ajouté
      alert("Produit ajouté au panier");
  }
}