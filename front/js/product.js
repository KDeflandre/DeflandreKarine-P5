// Lien du produit vers la page produit + id produit 
let params = (new URL(window.location.href)).searchParams;
const idProduct = params.get("id");
console.log(idProduct);

// // Recup produits
// async function loadProduct() {
//     try {
//       const responseProduct = await fetch("http://localhost:3000/api/products/" + idProduct);
//         console.log("Product are ok =)")
//         return responseProduct.json();
//     }
//     catch (error) {
//       console.error(error);
//       return []
//         }
//       }
      
//   postProduct();

//   // Appelle des produits
//   async function postProduct() {
//    await loadProduct() 
//    .then(product => { 
//       let item = document.querySelector(".item");
//       item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl}" 
//       alt="${product.altTxt}">`);
//       item.querySelector("#title").insertAdjacentHTML("afterbegin", product.name);
//       item.querySelector("#price").insertAdjacentHTML("afterbegin", product.price);
//       item.querySelector("#description").insertAdjacentHTML("afterbegin", product.description);
//       // item.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors);
//       for (let colors of product.colors){
//         console.table(colors);
//         let productColors = document.createElement("option");
//         document.querySelector("#colors").appendChild(productColors);
//         productColors.value = colors;
//         productColors.innerHTML = colors;
//       }
      
//     })
//   }



loadProduct ();

  async function loadProduct() {
  await fetch("http://localhost:3000/api/products/" + idProduct)
  .then((responseProduct) => responseProduct.json())
  .then(product => { 
  let item = document.querySelector(".item");
  item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl}" 
  alt="${product.altTxt}">`);
  item.querySelector("#title").insertAdjacentHTML("afterbegin", product.name);
  item.querySelector("#price").insertAdjacentHTML("afterbegin", product.price);
  item.querySelector("#description").insertAdjacentHTML("afterbegin", product.description);
  console.log("Product are ok =)")

  for (let colors of product.colors){
  console.table(colors);
  let productColors = document.createElement("option");
  document.querySelector("#colors").appendChild(productColors);
  productColors.value = colors;
  productColors.innerHTML = colors;
  }

  })
}

// Mise au panier 

// {
//   a6ec5b49bd164d7fbe10f37b6363f9fb : {
//       Pink: 2,
//       Yellow: 3
//   },
  
//   107fb5b75607497b96722bda5b504926 : {
//       White: 1
//   }
// }

// ajout produits au panier
function addToCart() {
  const btnAddToCart = document.querySelector("#addToCart");
  btnAddToCart.addEventListener("click", addToCart);
  
  // Vérif que la couleur et les quantités ont bien été choisis
  const quantitySelect = document.querySelector("#quantity");
  const colorSelect = document. querySelector("#colors");
  
  if (quantitySelect.value > 0 && quantitySelect.value <=100 && quantitySelect.value 
    != 0 && colorSelect.value != 0) { 

  // local storage     
  if (localStorage.getItem("product")) {
    
    let productLocalStorage = JSON.parse(localStorage.getItem("product"));
    console.log(productLocalStorage);

    let id = idProduct;
    let color = document.querySelector("#colors").value;
    let quantity = document.querySelector("#quantity").value;

}}
}