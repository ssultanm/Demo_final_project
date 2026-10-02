const API_URL = "http://195.26.245.5:9505/api";
let allproduct=[]
async function loadProducts() {

    const box = document.getElementById("products")
    const response = await fetch(API_URL + "/products")
    const products = await response.json();
    allproduct=products
    let html = "";
    for (const product of products) {
        html += productCard(product);
    }
    box.innerHTML = html
}
loadProducts()


async function showProducts(products) {
    const box = document.getElementById("products")
    if(products.length===0){
            box.innerHTML="<p> Нчиего не найдено</p>"
            return;
    }

   let html = "";
    for (const product of products) {
        html += productCard(product);
    }
        box.innerHTML = html

}

function productCard(product) {
    return `
<div class="card">
<img class="card_img" src="${product.imageUrl}"> 
<h3 class="card_title">${product.brand} ${product.model} </h3>
<p class="card_price">${product.price} </p>
<button>See Details</button>
</div>

`
}

function searchProducts(){
    const text =document.getElementById("search").value.toLowerCase();
    const filtered=allproduct.filter(product=>{
        const name=product.brand + " "+ product.model;
        return name.toLowerCase().includes(text)
    })
    showProducts(filtered)
}
function sortByPrice(){
    allproduct.sort((a,b)=>a.price-b.price);
    showProducts(allproduct)
}