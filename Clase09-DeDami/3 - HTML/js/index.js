//Sirve para esperar que la pagina este cargada
$(function(){
    //Selecciono por ID
    $("#btnEnviar").click(function(){
        console.log($("p.rojo").text());
        console.log($("p.rojo").html());
        console.log($("#btnEnviar").val());
        console.log($("#btnEnviar").attr("id"));
    })

    $("#btnCambiar").click(function(){
        //cambiando texto
        $("p.rojo").text("El nueevo texto del parrafo rojo");
        //Poniendo el texto en negrita
        $("p:last").html("<strong> Este parrafo va en negrita</strong>");
        $("p:last").html("<strong> Este parrafo va en negrita</strong>");

       // $("#btnCambiar").val("nUEVO cAMbIAR");
      //$("#btnCambiar").attr("class", "azul");
       $("#btnCambiar").attr({
           "class": "coral  ",
           "miAttr": "miVal"
       })

       $("#btnCambiar").attr("class", function(i,prevValue){
           console.log("Clase anterior " + prevValue);
           return "rojo";
       })
       var boton = $("<input>").val("Nuevo boton").attr("type", "button");
       $("#btnCambiar").before(boton);
    })

})

