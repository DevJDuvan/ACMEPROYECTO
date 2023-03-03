function limpiar_inputs() {

$("#correo_trabajador").val(""),
$("#nombre_trabajador").val(""),
$("#apellidos_trabajador").val(""),
$("#img_trabajador").val(""),
$("#tipo_usuario").val(""),
$("#telefono").val(""),
$("#contraseña").val(""),
$("#tienda_asignada").val(""),
$("#id_tipo_usuario").val(""),
$("#id_tienda_asignada").val("")
}



// metodo para actualizar
$('#actualizar_usuario').click(function(){
  const data = JSON.stringify({
    signin: $("#correo_trabajador").val(),
    nombre: $("#nombre_trabajador").val(),
    apellidos: $("#apellidos_trabajador").val(),
    img: $("#img_trabajador").val(),
    tipo_usuario: $("#tipo_usuario").val(),
    telefono: $("#telefono").val(),
    id_tipoUser: $("#id_tipo_usuario").val(),
    tienda: $("#tienda_asignada").val(),
    id_tienda_pertenece: $("#id_tienda_asignada").val()
});

const urls = 'http://localhost:3001/api/v1/actualizar_usuario/'
// uso de la api fetch
fetch(urls, {
    method: 'PUT', // or 'PUT'
    body: data, // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
     'token': localStorage.getItem('tokenScrt')
  }
  // recibe respuesta
}).then(res => {
  // convierte en json
    return res.json();
}
).then(estado => {
    if (estado.status == 200) {  
      limpiar_inputs();  
 alert('usuario actualizado')
   
        
      } else if (estado.status == 'Failure') {
        alert(estado.Resp.message)
      }
      else if (estado.status == "BL2022") {
        alert(estado.Resp.message)
      }
      else if (estado.status == 'BL2026') {
        alert(estado.Resp.message)
      }
      else{
        alert(estado.Resp.message)
      }
})
    .catch(error => {console.error('Error-------------------:', error)
    alert('error al intentar conectar con el servidor');
  
  })

})

$('#registrar_usuario').click(function () {
    const data = JSON.stringify({
        signin: $("#correo_trabajador").val(),
        nombre: $("#nombre_trabajador").val(),
        apellidos: $("#apellidos_trabajador").val(),
        img: $("#img_trabajador").val(),
        tipo_usuario: $("#tipo_usuario").val(),
        telefono: $("#telefono").val(),
        contraseña: $("#contraseña").val(),
        tienda: $("#tienda_asignada").val(),
        id_tipoUser: $("#id_tipo_usuario").val(),
        id_tienda_pertenece: $("#id_tienda_asignada").val()
    });
 
 

    const urls = 'http://localhost:3001/api/v1/registrar_usuario/'
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
        if (estado.status == 201) {
          
     
            if (estado.Resp.data.token && estado.Resp.data.data.tipo_usuario == "administrador") {
              alert("registro exitoso");
              limpiar_inputs();
            } else if (estado.Resp.data.token && estado.Resp.data.data.tipo_usuario == "colaborador") {
            alert("registro exitoso");
            limpiar_inputs();
            }
          } else if (estado.status == 'Failure') {
            alert(estado.Resp.message)
          }
          else if (estado.status == "BL2022") {
            alert(estado.Resp.message)
          }
          else if (estado.status == 'BL2026') {
            alert(estado.Resp.message)
          }
          else{
            alert(estado.Resp.message)
          }
    })
        .catch(error => {console.error('Error-------------------:', error)
        alert('error al intentar ejecutar la funcion');
      
      })
     

});



