let frm;

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorSubmit);
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target);
    anuncios.push(nuevoAnuncio);
    document.getElementById("divTabla").innerHTML = "";
    document.getElementById("divTabla").appendChild(crearTabla(anuncios));
}

function obtenerAnuncio(frm) {
    console.log(frm);
    let titulo;
    let descripcion;
    let tipo;
    let precio;
    let banos;
    let dormitorios;
    let cocheras;
    for (element of frm.elements) {
        switch (element.name) {
            case "titulo":
                titulo = element.value;
                break;
            case "descripcion":
                descripcion = element.value;
                break;
            case "tipo":
                if (element.checked) {
                    tipo = element.value;
                }
                break;
            case "precio":
                precio = element.value;
                break;
            case "banos":
                banos = element.value;
                break;
            case "dormitorios":
                dormitorios = element.value;
                break;
            case "cocheras":
                cocheras = element.value;
                break;
        }
    }
    return new Anuncio(titulo, descripcion, tipo, precio, banos, dormitorios, cocheras);
}