let frm;
let arrayDeAnuncios = [];
let anuncio = {};

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorSubmit);
}

 function manejadorSubmit(e) {
    e.preventDefault();
    //crear el js de anuncio y hacer un new Anuncio()
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

