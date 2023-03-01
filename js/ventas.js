// funcion para desplegar menu de carrito
let car = document.querySelector(".cart")
$('#cart-icon').click(function () {

    car.classList.add("active")
});
//
$('#close-cart').click(function () {
    car.classList.remove("active")
})
// funcion para agregar productos
var imgVentas = 'https://2.bp.blogspot.com/-fNDZNGN7daY/Ub6TE4_uvdI/AAAAAAAABV8/yBhuHF4p6_U/s1600/paso-a--paso1.jpg'
window.onload=miFuncion;
function miFuncion(){
  
}

$(window).ready(peticionConsultarProductos);

//Funcion 
var boton= document.getElementById('cart-icon');
boton.addEventListener("click",function(){
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);

    }  
})


function peticionConsultarProductos() {
    const urls = 'http://localhost:3001/api/v1/consultar_productos'
    fetch(urls, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('tokenScrt')
        }
    }).then(res => {
        return res.json();
    }
    ).then(estado => {
        console.log(estado);
        if (estado.status==200) {
           
           ;
            $.each(estado.Resp.data.data, function (index, elemento) {
                var cartItems = document.getElementsByClassName('shop-content')[0]
                var CartShopBox = document.createElement('div');
                CartShopBox.classList.add('product-box')
                CartShopBox.innerHTML =
                ` <img class="product-img"
                src=${elemento.img_producto}
                alt="">
            <h6 class="reference">${elemento.id}</h6>
            <h2 class="product-title">${elemento.nombre_producto}</h2>
            <span class="price">${elemento.precio_venta}</span>
            <i class='bx bx-shopping-bag add-cart'></i>
                `;
               cartItems.append(CartShopBox);
              });

        } else {
            alert('error al agregar producto')
        }
    }).catch(error => console.error('Error-------------------:', error))
 

}


// carrito funciones
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}
// function
function ready() {
    // remover productos del carrito de compras
    let removeCartButtons = document.getElementsByClassName("cart-remove")
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //canyidd cambia
    var quantityInput = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged);


    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
    // agregar productos al carro
  
  
    //boton de comprar


}



// funcion comprar, el usuario da click y manda la consulta a la base de datosy borra el contenido de carrito
var itemObject = [];
function addData(id, nombre, precio, cantidad, id_autenticado, id_punto_venta, total) {
    var datosUser = JSON.parse( localStorage.getItem('dataUser'));
    var OBJECT = {
        id_producto: id,
        nombre_producto: nombre,
        precio: precio,
        cantidad: cantidad,
        id_punto_venta: datosUser.id_tienda,
        id_autenticado: datosUser.id_usuario,
        total: total
    }
    itemObject.push(OBJECT)
    console.log(itemObject)

    peticionAgregarVenta(itemObject);

}
function buyButtonClicked() {

    var cartContent = document.getElementsByClassName('cart-content')[0];
    var divdetails = document.getElementsByClassName('cart-box');
    var cartTotal = document.getElementsByClassName('total-price')[0].innerHTML;

    for (var i = 0; i < divdetails.length; i++) {
        var cartTitle = document.getElementsByClassName('cart-product-title')[i].innerHTML;
        var cartPrice = document.getElementsByClassName('cart-price')[i].innerHTML;
        var cartQuiantity = document.getElementsByClassName('cart-quantity')[i].value;
        var cartReference = document.getElementsByClassName('reference')[i].innerHTML;

        alert(cartTotal)
        addData(cartReference, cartTitle, cartPrice, cartQuiantity, 1, 1, cartTotal);
    }
    alert("compra finalizada,gracias");
    while (cartContent.hasChildNodes()) {


        cartContent.removeChild(cartContent.firstChild)

    }
    updatettotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatettotal();

}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatettotal();
}
// fincion que al clickear agreg producto
function addCartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var reference = shopProducts.getElementsByClassName('reference')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var imgProduct = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title, imgProduct, price, reference)

    updatettotal();
}
// funcion para anadir al carrito
function addProductToCart(title, imgProduct, price, reference) {
    var CartShopBox = document.createElement('div');
    CartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('producto ya agregado')
            return;
        }

    }

    //  var cartBoxContent =

    CartShopBox.innerHTML = ` <img src="${imgProduct}" alt="" class="cart-img">
        <div class="details-box">
            <div class="cart-product-title">${title}</div>
            <h6 class="reference">${reference}</h6>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!--remover producto-->
        <i class='bx bx-trash-alt cart-remove'></i>  
        `
    cartItems.append(CartShopBox)
    CartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    CartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);




}

// actualizar el total
function updatettotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerHTML.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // si el precio tiene muchos decimales
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerHTML =  total;

}


// funcion para peticion al api y agregar ventas de productos
function peticionAgregarVenta(productos) {
    const data = JSON.stringify({
        productos
    });
  
    const urls = 'http://localhost:3001/api/v1/registrar_venta/'
    fetch(urls, {
        method: 'POST', // or 'PUT'
        body: data, // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('tokenScrt')
        }
    }).then(res => {
        return res.json();
    }
    ).then(estado => {
        console.log(estado);
        if (estado.status==200) {
            alert("producto agregado con exito")
        } else {
            alert('error al agregar producto')
        }
    }).catch(error => console.error('Error-------------------:', error))
 
   
}

