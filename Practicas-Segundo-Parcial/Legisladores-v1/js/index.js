let arrayAnuncios;
$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
    $("#frm").submit(manejadorSubmit);
    $("#lblId").hide();
    $("#idAnuncio").hide();
    $("#btnLimpiar").click(limpiarForm);
    arrayLegisladores = JSON.parse(localStorage.getItem("Legisladores"));

    cargarGrilla(arrayLegisladores);
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    //console.log(nuevoAnuncio);
    altaAnuncio(nuevoAnuncio);

}

//////////////////////LLAMADAS AJAX/////////////////////////////////
function cargarGrilla(array) {
    let tabla = $("#divTabla");
    tabla.html('');
    $('tbody', tabla);

    if (primeraVez === true) {
        crearBoxes(datos, "divChk");
        primeraVez = false;
    }
    //checkbox.html('');
    tabla.append(crearTabla(array));
    let tds = $("td");
    tds.on("click", setValues);

}


function obtenerAnuncio(frm, tieneId) {
    let nombre;
    let apellido;
    let email;
    let edad;
    let radioTipo;
    let radioSexo;

    for (element of frm.elements) {
        switch (element.name) {
            case "nombre":
                nombre = element.value;
                break;
            case "apellido":
                apellido = element.value;
                break;
            case "edad":
                edad = element.value;
                break;
            case "email":
                email = element.value;
                break;
            case "radioSexo":
                if (element.checked === true) {
                    radioSexo = element.value;
                }
                break;
            case "radioTipo":
                if (element.checked === true) {
                    radioTipo = element.value;
                }
                break;
            /*case "idLegislador":
                if (tieneId === true) {
                    id = element.value;
                } else {
                    id = element.value;
                    ids = arrayAnuncios.map(element => element.id).sort(function (a, b) { return a - b; });
                    ultimoId = ids[ids.length - 1];
                    ultimoId++;
                    id = ultimoId.toString();
                }
                break;*/
        }
    }
    let a = new Legislador(1, nombre, apellido, edad, email, radioSexo, radioTipo);
    console.log(a);
    return a;
}



