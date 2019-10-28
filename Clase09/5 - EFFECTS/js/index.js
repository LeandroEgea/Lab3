//Sirve para esperar que la pagina este cargada
$(function () {
 $("p:last").hide(3000, function(){
    $("p:last").show(3000);
 });

 $("#btnEnviar").toggle(4000, function(){
    $("#btnEnviar").toggle(4000);
 })

 $("#btnEnviar").click(function(){
    $("#btnEnviar").animate({
        height: '+=50px',
        width: '+=50px'
    },5000).animate({
        height: '-=50px',
        width: '-=50px'
    },5000)
 })
})


