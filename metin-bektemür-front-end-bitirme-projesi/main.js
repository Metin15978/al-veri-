let localStorage=window.localStorage;
const btn_cart = document.getElementsByClassName("btn-cart");
const delete_btn = document.getElementsByClassName("delete");



eventListeners();

function eventListeners(){
    window.addEventListener("load", function(){
       
        let page =window.location.pathname;
        if(page ==="/index.html")
        {
            filldetailtable();
        }
           



    for (let i = 0; i <btn_cart.length; i++){
        btn_cart[i].addEventListener("click",AddCart);
    }
    filldetailtable();
    });
}


function AddCart(e) {
    let id = e.target.name;
        let img = document.getElementById("p-img-" + id).src;
        let price = parseInt(document.getElementById("p-price-" + id).innerText.split(" ")[0]);
        let count = parseInt(document.getElementById("p-count-" + id).value);

        let cart = {
            product_name: document.getElementById("p-name-" + id).innerText,
            product_price: price,
            product_count: count,
            product_total: price * count,
            product_img: img,
        };

        AddCartstroge(cart);
}


function GetCartstroge(){
    let carts=[];
    if(localStorage.getItem("carts")===null){
        carts = []
    }else{
        carts = JSON.parse(localStorage.getItem("carts"));
    }

    return carts;
  
}

function AddCartstroge(data){
    let carts =GetCartstroge();
    console.log(carts);
    carts.push(data);
    localStorage.setItem("carts",JSON.stringify(carts));
}

function DeleteCarts(id){
    let carts=GetCartstroge();

    carts.splice(id,1);

    localStorage.setItem("carts",JSON.stringify(carts));
    filldetailtable();

}




function filldetailtable() {
    let html = '';
    let carts = GetCartstroge();
   

    for (let i = 0; i < carts.length; i++) {
        html += '<tr>' +
            '<td style="width:28%"> <img style="max-width: 20%;" src="' + carts[i].product_img + '"></td>' +
            '<td>' + carts[i].product_name + '</td>' +
            '<td>' + carts[i].product_price + '</td>' +
            '<td>' + carts[i].product_count + '</td>' +
            '<td>' + carts[i].product_total + '</td>' +
            '<td><i class="fas fa-trash delete" onclick="DeleteCarts(' + i + ')"></i></td>' +
            '</tr>';
           
    }
    document.getElementById('cart-detail').innerHTML = html;
}






 