//Sirve para esperar que la pagina este cargada
$(function(){
    //Selecciono por ID
    $("#btnEnviar").click(function(){
        //alert("Hola mundo");
    })

    $("p").hover(function(){
        //Mouse enter
        //console.log("holas");
    },
    function(){
        //Mouse leave
        //console.log("chaus");
    })

    $("p.rojo").on("click", function(){
        ///alalalala esto es un evento click
    })
    //Multiples selectores de cosas
    $("p.rojo").on({
        "click": function(){
            console.log("Hiciste click");
        },
        "mouseenter": function(){
            console.log("Pasaste el mouse");

        },
        "mouseleave": function(){
            console.log("Se fue el mouse");
        }
    })


    $("p.rojo").off("click");

})

