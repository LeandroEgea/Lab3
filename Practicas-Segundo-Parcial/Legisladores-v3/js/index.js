let arrayAnuncios;
let primeraVez;
let arrayLegisladores = [];
$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
    $("#frm").submit(manejadorSubmit);
    $("#lblId").hide();
    $("#idLegislador").hide();
    //$("#btnLimpiar").click(limpiarForm);
    arrayObjetos = JSON.parse(localStorage.getItem("Legisladores"));
    arrayObjetos.forEach(object => {
        let legislador = new Legislador(object.id, object.nombre, object.apellido, object.edad, object.email, object.sexo, object.tipo)
        arrayLegisladores.push(legislador);
    });
    cargarGrilla(arrayLegisladores);
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoLegislador = obtenerLegislador(e.target, false);
    arrayLegisladores.push(nuevoLegislador);
    localStorage.setItem("Legisladores", JSON.stringify(arrayLegisladores));
    cargarGrilla(arrayLegisladores);

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
    //tds.on("click", setValues);

}


function obtenerLegislador(frm, tieneId) {
    let nombre;
    let apellido;
    let email;
    let edad;
    let radioTipo;
    let radioSexo;
    let id;

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
            case "idLegislador":
                if (tieneId === true) {
                    id = element.value;
                } else {
                    arrayObjetos = JSON.parse(localStorage.getItem("Legisladores"));
                    if(arrayObjetos.length !== 0)
                    {
                        ids = arrayObjetos.map(element => element.id).sort(function (a, b) { return a - b; });
                        ultimoId = ids[ids.length - 1];
                        ultimoId++;
                        id = ultimoId.toString();
                    }
                    else{
                        id = 1;
                    }
                }
                break;
        }
    }
    let legislador = new Legislador(id, nombre, apellido, edad, email, radioSexo, radioTipo);
    return legislador;
}



