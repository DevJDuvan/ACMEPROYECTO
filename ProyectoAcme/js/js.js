//https://getbootstrap.com/docs/3.4/css/
//https://getbootstrap.com/docs/4.4/content/tables/
//Cargar funcionalidades durante la carga del html
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
 
} else {

  ready();
}
var img ='https://cloudfront-us-east-1.images.arcpublishing.com/infobae/R534LQL67JFNZDO4EPSTR5WIUU.png';
// function
// funcion para agregar la informaciondel usaurio al modal
function ready() {
  //Agregando funciolidades a los botones y cargando informacion del usuario al modal 
  var datosUser = JSON.parse( localStorage.getItem('dataUser'));
  var BTNshow = document.getElementById("view-infoUser")
  BTNshow.addEventListener('click',function(){
  
    var CartShopBox = document.createElement('div');
    CartShopBox.classList.add('modal-content')
    var cartItems = document.getElementsByClassName('modal')[0];
    CartShopBox.innerHTML = `
    <span class="close">&times;</span>
    <div class="title">
 <img  class="img-fluid" src=${datosUser.img} alt="Responsive image" />
       <h4 class='parrafo_modal'>${datosUser.nombre_usuario} ${datosUser.apellido_usuario}  </h4>
    </div>
    <hr></hr>
    <div class='container_email'>
      <span class="parrafo_modal"> id usuario :  ${datosUser.id_usuario}  </span>
      <span class="parrafo_modal"> corporativo:  ${datosUser.correo}  </span>
       <span class="parrafo_modal"> cargo:  ${datosUser.tipo_usuario}  </span>
       <span class="parrafo_modal"> telefono :  ${datosUser.telefono}  </span>
       <span class="parrafo_modal"> ciudad/tienda:   ${datosUser.nombre_tienda}  </span>
    </div>
    <form class='container_inputs'>
    <button class="btn" id="out_login"> <i id="out_login"class='bx bxs-user-detail'  ></i></button> 
    </form>
        `
    cartItems.append(CartShopBox)
    var btn_cerrar = document.getElementById("out_login");
    //Metodo para borrar informacion del local storage y cerrar sesion
    btn_cerrar.addEventListener('click',function(){
      window.open('http://127.0.0.1:5500/index.html', '_self');
      localStorage.clear;
      alert('cierre de sesion exitoso')
        })
   // CartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
   // mostramos modal cambiando la propiedad display a block
    $(".modal").css("display", "block");
    span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
       // mostramos modal cambiando la propiedad display a none
      $(".modal").css("display", "none");
     }
  
  })



  }


 /* function activate modal inversores_modal ------------------------*/
// Get the modal

   // Get the <span> element that closes the modal

   // When the user clicks on <span> (x), close the modal
  

// When the user clicks on the button, open the modal

// get the button that open login modal---------------------------





//--------------------------------------------------------------------------
//ajax
$("#button").on("click", imprimir);
$("#ir_compras").on("click", ir_compras);


function comprar_producto(id) {
  console.log(id)
}

function ir_compras(evt) {
  evt.preventDefault();
  window.open('compras.html', '_self');


}


$('#close-cart').click(function () {
  car.classList.remove("active")
})



function imprimir(evt) {
  evt.preventDefault();
  window.open('panel_administrador.html', '_self');


}

// metodo obtener personas
const urlapi = 'https://andresriascos.pw/api/v1/personas';
$("#get_personas").on("click", getempleados);

$("#get_municipios_item").on("click", getempleadoItem);
function getempleados() {
  $.ajax({
    url: urlapi,

    success: function (respuesta) {
      $("#municipios").find(".all tr").remove();
      $.each(respuesta.personas, function (index, elemento) {
        var entrada = $("#entrada");
        var newRowContent =
          '<tr>'
          + '<td>' + elemento.id_persona + '</td>'
          + '<td>' + elemento.nombre_completo + '</td>'
          + '<td>' + elemento.numero_documento + '</td>'
          + '<td>' + elemento.correo + '</td>'

          + '</tr>';
        $("#municipios tbody").append(newRowContent);
        entrada.val("");
      });
    },
    error: function () {
      console.log("No se ha podido obtener la información");
    }
  });
}


//metodo obtener por id

function getempleadoItem() {
  $.ajax({
    url: 'https://andresriascos.pw/api/v1/personas',

    success: function (respuesta) {
      $("#municipios").find(".all tr").remove();
      $.each(respuesta.personas, function (index, elemento) {
        var entrada = $("#entrada");
        var resultado = $(entrada).val();
        if (elemento.id_persona == resultado) {

          var newRowContent =
            '<tr>'
            + '<td>' + elemento.id_persona + '</td>'
            + '<td>' + elemento.nombre_completo + '</td>'
            + '<td>' + elemento.numero_documento + '</td>'
            + '<td>' + elemento.correo + '</td>'



            + '</tr>';
          $("#municipios tbody").append(newRowContent);
          entrada.val("");
        }
      });
    },
    error: function () {
      console.log("No se ha podido obtener la información");
    }
  });
}



// codigo para registrar empleados

$("#registrar_empleado").on("click", registrar_empleados);



function limpiar_inputs() {
  //var entrada = $("#entrada");
  //var resultado = $(entrada).val();
  $("#id_empleado").val("");
  $("#nombre_empleado").val("");
  $("#documento_empleado").val("");
  $("#correo_empleado").val("");
}

function registrar_empleados() {
  const data = JSON.stringify({
    id_persona: $("#id_empleado").val(), nombre_completo: $("#nombre_empleado").val(),

    numero_documento: $("#documento_empleado").val(),

    correo: $("#correo_empleado").val(),
  });

  $.ajax({
    url: 'https://andresriascos.pw/api/v1/personas',
    method: "post",
    contentType: 'application/json; charset-utf-8',
    data: data,
    success: function (respuesta) {

      console.log(respuesta);
      limpiar_inputs();
      alert("persona registrada con exito");


    },
    error: function () {
      console.log("No se ha podido obtener la información");
    }
  });
}

// metodo para actualizar empleado

$("#actualizar_empleado").on("click", modificaUsuario);

function modificaUsuario(id) {


  var entrada = $("#id_empleado");
  var resultado = $(entrada).val();
  id = resultado;
  console.log(id);
  var url = "https://andresriascos.pw/api/v1/personas/" + id;
  console.log(url)

  $.ajax({
    type: "PUT",
    dataType: "json",
    url: "https://andresriascos.pw/api/v1/personas/" + id,

    data: {
      id_empleado: $("#id_empleado").val(), nombre_completo: $("#nombre_empleado").val(),

      numero_documento: $("#documento_empleado").val(),

      correo: $("#correo_empleado").val(),
    }
  })
    .done(function (result) {
      limpiar_inputs();
      alert("persona actualizada con exito");
      console.log(result);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      $("#usuarios").append("Error : " + textStatus);
    });

}



//metodo para iniciar sesion
// metodo para iniciar sesion
$("#button_iniciarSesion").click(function (event) {
  // no recargue la pagina
  event.preventDefault();
  window.open('http://127.0.0.1:5501/views/panel_administrador.html', '_self');
  // tomamos datos de los inputs del fronentd
  const data = JSON.stringify({
    username: $("#user_name").val(), password: $("#user_password").val(),
  });

  console.log(data)
  // endpoint
  const urls = 'http://localhost:3001/api/v1/login/'
  // llamamos al enpoint de iniciar sesion
  fetch(urls, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json'
    }
    // recibimos respuesta del servidor
  }).then(res => {
    return res.json();
  }
  ).then(estado => {
    console.log(estado)
    // segun la respuesta del servidor realizamos a funcion correspondiente
    if (estado.status == 200) {
      // 200 es corecto
      // variable global del navegador
      localStorage.setItem('dataUser',JSON.stringify(estado.Resp.data.data))
      localStorage.setItem('tokenScrt', estado.Resp.data.token)
      var guardado = JSON.parse( localStorage.getItem('dataUser'));
  //valida si es administrador o colaborador
      if (estado.Resp.data.token && estado.Resp.data.data.tipo_usuario == "administrador") {
        window.open('http://127.0.0.1:5500/views/panel_administrador.html', '_self');
      } else if (estado.Resp.data.token && estado.Resp.data.data.tipo_usuario == "colaborador") {
        window.open('http://127.0.0.1:5500/views/panel_administrador.html', '_self');
      }
      // failure error en el servidor
    } else if (estado.status == 'Failure') {
      alert(estado.Resp.message)
    }
        // failure usuario no existentente
    else if (estado.status == "BL2022") {
      alert(estado.Resp.message)
    }
    // contraseña incorrecta
    else if (estado.status == 'BL2026') {
      alert(estado.Resp.message)
    }
    else if (estado.status == "BL2021") {
      alert(estado.Resp.message)
    }

  })
    .catch(error => console.error('Error al ejecutar funcion de iniciar sesion:', error))

});



