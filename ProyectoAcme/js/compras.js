





















 
$('button').click(function() {
    var n=0;
    while(n<5){
    var contador = $('.obra-social').length + 1;
    var bloque = ' <div id="obra-social- ' + contador + ' "    class="obra-social"><button onclick="imprimir('+contador+')">Contenido obra social</button></div>';

        $('#contenedor').append(bloque);
        n++
    }
        
  });

    
    

      $( "#boton_imprimir" ).click(function() {
     
        alert(1)
      });
    


function imprimir(id){
    alert(id)
}
