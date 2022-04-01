
const id = new URL(window.location.href).searchParams.get("orderId");
console.log(id);

const orderId = document.getElementById('orderId');
orderId.innerHTML = id;
