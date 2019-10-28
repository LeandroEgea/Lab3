//Sirve para esperar que la pagina este cargada
$(function () {
    $("#btnCambiar").click(function(){
        var boton = $("<input>").val("Nuevo boton").attr("type", "button").addClass("coral").css("margin", "100px");
        $("#btnCambiar").before(boton);

        $("#btnCambiar").toggleClass("coral");

    })

    console.log($("input:last").css("margin")); 
})


