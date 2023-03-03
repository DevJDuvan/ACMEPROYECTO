function limpiar_input(){
  $("#nombre_producto").val(""),
  $("#img_producto").val(""),
  $("#talla_producto").val(""),
  $("#cantidad").val(""),
  $("#precio_compra").val(""),
  $("#precio_venta").val(""),
  $("#id_categoria").val("")
  }
$("#registrar_producto").on("click", function (event) {
  const data = JSON.stringify({
    nombre_producto: $("#nombre_producto").val(),
    img: $("#img_producto").val(),
     talla: $("#talla_producto").val(),
     cantidad_disponible:$("#cantidad").val(),
     precio_compra:$("#precio_compra").val(),
     precio_venta:$("#precio_venta").val(),
     id_categoria:$("#id_categoria").val(),
  });
  var myHeaders = new Headers();

  var myInit = {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
  };
  console.log(data)
  const urls = 'http://localhost:3001/api/v1/crear_producto/'
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
    if(estado.status==200) {
    alert(estado.Resp.message)
    limpiar_input();
    } else if(estado.status==406) {
      alert(estado.Resp.message)
    }
    else if(estado.status=='failure') {
      alert(estado.Resp.message)
    }else{
      alert(estado.Resp.message)
    }
  })
    .catch(error => console.error('Error-------------------:', error))
  
});

