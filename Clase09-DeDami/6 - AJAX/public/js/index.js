//Sirve para esperar que la pagina este cargada
$(function () {
$("#btnCargar").click(function(){
   //llamo a cargar
   console.log("datos");
   var impresion_consola = function(){
      console.log(datos);
   }
   cargarDatos(impresion_consola);
})
})


