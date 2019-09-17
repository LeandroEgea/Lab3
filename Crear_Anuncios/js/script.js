var arrayDeAnuncios = [];
var anuncio = {};
var btnAltaAnuncio;

window.addEventListener('load', function(){
    btnAltaAnuncio = document.getElementById('btnAltaAnuncio');
    btnAltaAnuncio.addEventListener('click', altaBoton);
});

altaBoton = function(e) {
    //console.log(e);
    //e.preventDefault();
    //porque no hace nada con esto comentado ?
    anuncio = {
        nombre : document.getElementsByName("titulo")[0].value,
        descripcion: document.getElementsByName("descripcion")[0].value,
        precio: document.getElementsByName("precio")[0].value,
        cantidadBanos: document.getElementsByName("banos")[0].value,
        cantidadDormitorios: document.getElementsByName("dormitorios")[0].value,
        cantidadCocheras: document.getElementsByName("cocheras")[0].value
    }
    
    arrayDeAnuncios.push(anuncio);
    console.log(JSON.stringify(arrayDeAnuncios));
}

