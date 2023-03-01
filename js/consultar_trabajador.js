$(window).ready(peticionConsultarTrabajadores);
var imgVentas = 'https://2.bp.blogspot.com/-fNDZNGN7daY/Ub6TE4_uvdI/AAAAAAAABV8/yBhuHF4p6_U/s1600/paso-a--paso1.jpg'

function peticionConsultarTrabajadores() {
    const urls = 'http://localhost:3001/api/v1/consultar_trabajadores'
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
            $.each(estado.Resp.data.trabajadores, function (index, elemento) {
                var cartItems = document.getElementsByClassName('shop-content')[0]
                var CartShopBox = document.createElement('div');
                CartShopBox.classList.add('product-box')
                CartShopBox.innerHTML =
                ` <img class="product-img" src=${elemento.img} alt="">
                <div class="container_datos"><h6 class="reference">numero de identificacion:</h6><h6 class="reference">${elemento.id}</h6></div>
                <h6 class="reference">nombre trabajador</h6>  <h6 class="reference">${elemento.nombre}</h6>
                <h6 class="reference">apellido</h6>  <h6 class="reference">${elemento.apellido}</h2>
                <h6 class="reference">tipo:</h6>  <h6 class="reference">${elemento.tipo_usuario}</h6>
                <h6 class="reference">telefono</h6>  <h6 class="reference"> ${elemento.telefono}</h2>
                <h6 class="reference">ciudad/tienda</h6>  <h6 class="reference"> ${elemento.tienda_pertenece}</h2>
                `;
               cartItems.append(CartShopBox);
                
            
              });

        } else{
            alert(estado.Resp.message)
          }
    }).catch(error => console.error('Error-------------------:', error))
 
   
}



