//Funcion que al estar cargado el html ejecuta las consultas al backend

$(window).ready(peticionConsultarVentas);
var imgVentas = 'https://2.bp.blogspot.com/-fNDZNGN7daY/Ub6TE4_uvdI/AAAAAAAABV8/yBhuHF4p6_U/s1600/paso-a--paso1.jpg'

function peticionConsultarVentas() {
    const urls = 'http://localhost:3001/api/v1/consultar_ventas'
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
        if (estado.status!=401) {
           
           ;
            $.each(estado.Resp.data.data, function (index, elemento) {
                var cartItems = document.getElementsByClassName('shop-content')[0]
                var CartShopBox = document.createElement('div');
                CartShopBox.classList.add('product-box')
                CartShopBox.innerHTML =
                ` <img class="product-img" src=${imgVentas} alt="">
                <div class="container_datos"><h6 class="reference">id venta:</h6><h6 class="reference">${elemento.id}</h6></div>
                <h6 class="reference">fecha:</h6>  <h6 class="reference">${elemento.data}</h6>
                <h6 class="reference">punto de venta</h6>  <h6 class="reference">${elemento.id_punto_venta}</h6>
                <h6 class="reference">vendedor</h6>  <h6 class="reference">${elemento.id_autenticado}</h2>
                <h6 class="reference">Total de la venta</h6>  <h6 class="reference"> $${elemento.total}</h2>
                `;
               cartItems.append(CartShopBox);
                
            
              });

        } else {

            alert(estado.Resp.message)
        }
    }).catch(error => console.error('Error-------------------:', error))
 
   
}
