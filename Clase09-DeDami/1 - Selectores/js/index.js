//Sirve para esperar que la pagina este cargada
$(function(){
    //Selecciono por ID
    console.log($("#btnEviar"));

    //Seleciono por TAG
    console.log($("p"));
    //Selecciono por pseudoclase
    console.log($("p:last"))
    //Selleciono por atributo
    console.log($("p[class=rojo]"))
})