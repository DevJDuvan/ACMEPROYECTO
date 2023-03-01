 
$(window).ready(peticionConsultarProductos);

function peticionConsultarProductos() {
    const urls = 'http://localhost:3001/api/v1/consultar_productos'
    try{
    fetch(urls, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('tokenScrt')
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
                <h6 class="reference">REFERENCIA</h6>  <h6 class="reference">${elemento.id}</h6>
                <h6 class="reference">NOMBRE DEL PRODUCTO</h6>   <h2 class="product-title">${elemento.nombre_producto}</h2>
                <h6 class="reference">TALLA</h6>   <h2 class="product-title">${elemento.talla}</h2>
                <h6 class="reference">CANTIDAD DISPONIBLE</h6>   <h2 class="product-title">${elemento.cantidad_disponible}</h2>
                <span class="price">PRECIO DE VENTA$</span>  <span class="price">${elemento.precio_venta}</span>
                <button class="btn"  onclick="return eliminar_producto(${elemento.id});"><i class='bx bxs-trash-alt' id="btnDelete"></i></button> 
                
           
                `;
               cartItems.append(CartShopBox);
              });

        } else {
            alert('error al agregar producto')
        }
    }).catch(error =>{ console.error('Error-------------------:', error);
    alert('error al intentar conectar con el servidor');

}
    
  
    )
 

}catch(error){

    console.log(error)
}
}

function eliminar_producto(id){
    //recibe id del cliente 
    const data = JSON.stringify({
        id:id,
      
    });
 const urls = 'http://localhost:3001/api/v1/eliminar_producto/'
 fetch(urls,{
    
        method: 'DELETE', // or 'PUT'
        body: data, // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('tokenScrt')
        }

 }).then(resp=>{
 return resp.json();

 }).then(resp=>{
    if(resp.status!=401){
location.reload();
    }
    else
alert(resp.Resp.message)
 })
}