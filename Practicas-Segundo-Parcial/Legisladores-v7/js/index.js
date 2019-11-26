//TODO: margins
//TODO: poner los radios en una row cuando son md
//TODO: pasar el id a int
//TODO: cuando todo ande, ver que se puede dejar sin reinicializar de estos (tabla, select y checkbox)

let primeraVez = true;

function obtenerArrayLegisladores() {
    let arrayLegisladores = [];
    arrayObjetos = JSON.parse(localStorage.getItem("Legisladores"));
    arrayObjetos.forEach(object => {
        let legislador = new Legislador(object.id, object.nombre, object.apellido, object.edad, object.email, object.sexo, object.tipo)
        arrayLegisladores.push(legislador);
    });
    return arrayLegisladores;
}

$(function () {
    $("#frm").submit(manejadorSubmit);
    $("#lblId").hide();
    $("#idLegislador").hide();
    $("#btnLimpiar").hide();
    $("#btnBorrar").hide();
    $("#btnBorrar").click(manejadorBorrar);
    $("#btnLimpiar").click(limpiarForm);
    let arrayLegisladores = obtenerArrayLegisladores();
    calcularInfo(arrayLegisladores);
    cargarGrilla(arrayLegisladores);
})

function manejadorSubmit(e) {
    let arrayLegisladores = obtenerArrayLegisladores();
    e.preventDefault();
    //  let nuevoLegislador = obtenerLegislador(e.target, false);
    let nuevoLegislador = Controller.alta(arrayLegisladores);
    arrayLegisladores.push(nuevoLegislador);
    reestablecerPagina(arrayLegisladores);
}

function manejadorModificar(e) {
    let arrayLegisladores = obtenerArrayLegisladores();
    e.preventDefault();
    arrayLegisladores = Controller.modificar(arrayLegisladores);
    reestablecerPagina(arrayLegisladores);
}

function manejadorBorrar() {
    let arrayLegisladores = obtenerArrayLegisladores();
    arrayLegisladores = Controller.baja(arrayLegisladores);
    reestablecerPagina(arrayLegisladores);
}

function cargarGrilla(arrayFiltrados) {
    let tabla = $("#divTabla");
    let checkbox = $("divChk");
    tabla.html('');
    $('tbody', tabla);

    if (primeraVez === true) {
        let arrayLegisladores = obtenerArrayLegisladores();
        crearBoxes(arrayLegisladores, "divChk");
        primeraVez = false;
    }
    checkbox.html('');
    tabla.append(crearTabla(arrayFiltrados));
    let tds = $("td");
    tds.on("click", setValues);
}

function filtrarDatos() {
    let arrayLegisladores = obtenerArrayLegisladores();
    let opciones = ['id'];
    //Aca recorro uno por uno todos los checkbox
    $('.box input:checked').each(function () {
        if ($(this).prop('checked') == true) {
            ///Aca meto en un array todos los valores de los checkbox que esten tildados (titulo, descricion etc)
            opciones.push($(this).val());
        }
    });
    //Filtro por el valor del select
    let tipo = $('#selTipo').val();
    let datosFiltradosSel = arrayLegisladores;
    if (tipo !== "Todos") {
        datosFiltradosSel = datosFiltradosSel.filter(obj => obj.tipo === tipo);
    }
    calcularInfo(datosFiltradosSel);

    //Filtro por el valor de los checkbox
    let datosFiltradosChk = datosFiltradosSel.map(function (dato) {
        let retorno = new Object();
        opciones.forEach(elemento => {
            retorno[elemento] = dato[elemento];
        });
        return retorno;
    });
    //Vuelvo a cargar la tabla con los datos filtrados
    cargarGrilla(datosFiltradosChk);
}



function setValues(e) {
    let arrayLegisladores = obtenerArrayLegisladores();
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    let dato = arrayLegisladores.filter(obj => obj.id == nodos[0].innerText);
    //ID
    $("#idLegislador").val(dato[0].id);
    $("#idLegislador").show();
    $("#lblId").show();
    //Nombre
    $("#txtNombre").val(dato[0].nombre);
    //Sexo
    if (dato[0].sexo == "Masculino") {
        $('#sexoMasculino').prop('checked', true);
    } else {
        $('#sexoFemenino').prop('checked', true);
    }
    //Tipo
    if (dato[0].tipo == "Diputado") {
        $('#tipoDiputado').prop('checked', true);
    } else {
        $('#tipoSenador').prop('checked', true);
    }
    //Apellido
    $("#txtApellido").val(dato[0].apellido);
    //Email
    $("#txtEmail").val(dato[0].email);
    //Edad
    $("#numEdad").val(dato[0].edad);

    $("#btnCrearModificar").text("Modificar");
    $("#btnBorrar").show();
    $("#frm").off('submit', manejadorSubmit);
    $("#frm").submit(manejadorModificar);
    $("#btnLimpiar").show();
}

function reestablecerPagina(arr) {
    localStorage.setItem("Legisladores", JSON.stringify(arr));
    reestablecerBoxes(arr);
    cargarDatosSelect();
    limpiarForm();
    calcularInfo(arr);
    cargarGrilla(arr);
}

function limpiarForm() {
    $("#idLegislador").hide();
    $("#lblId").hide()
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtEmail").val("");
    $("#numEdad").val("0");
    $('#sexoMasculino').prop('checked', true);
    $('#tipoDiputado').prop('checked', true);

    $("#btnCrearModificar").text("Crear");
    $("#btnLimpiar").hide();
    $("#btnBorrar").hide();
    $("#frm").off('submit', manejadorModificar);
    $("#frm").submit(manejadorSubmit);
}

function reestablecerBoxes(arr) {
    let checkboxs = $('.box input');
    checkboxs.prop("checked", true);
    if (checkboxs.length == 0) {
        crearBoxes(arr, "divChk");
    }
}

function calcularInfo(arr) {
    let calculos = new Calculos();
    calculos.calcularEdad(arr);
    calculos.calcularGenderMix(arr);
    //calcularEdad(arr);
    //calcularGenderMix(arr);
}

// function calcularEdad(arr) {
//     let promedio;
//     let edades = arr.map(obj => parseInt(obj.edad));
//     if (edades.length > 0) {
//         promedio = edades.reduce((prev, curr) => (prev + curr)) / arr.length;
//     } else {
//         promedio = 0;
//     }
//     $('#txtInfoEdad').val(promedio.toFixed(2));
// }

// function calcularGenderMix(arr) {
//     let genderMix;
//     let cantidadLegisladores = arr.length;
//     if (cantidadLegisladores > 0) {
//         let cantidadMujeres = arr.filter(obj => obj.sexo === "Femenino").length;
//         genderMix = (cantidadMujeres / cantidadLegisladores) * 100;
//     } else {
//         genderMix = 0;
//     }
//     $('#genderMix').val(genderMix.toFixed(2) + " %");
// }

// function obtenerLegislador(frm, tieneId) {
//     let nombre;
//     let apellido;
//     let email;
//     let edad;
//     let radioTipo;
//     let radioSexo;
//     let id;

//     for (element of frm.elements) {
//         switch (element.name) {
//             case "nombre":
//                 nombre = element.value;
//                 break;
//             case "apellido":
//                 apellido = element.value;
//                 break;
//             case "edad":
//                 edad = element.value;
//                 break;
//             case "email":
//                 email = element.value;
//                 break;
//             case "radioSexo":
//                 if (element.checked === true) {
//                     radioSexo = element.value;
//                 }
//                 break;
//             case "radioTipo":
//                 if (element.checked === true) {
//                     radioTipo = element.value;
//                 }
//                 break;
//             case "idLegislador":
//                 if (tieneId === true) {
//                     id = element.value;
//                 } else {
//                     arrayObjetos = JSON.parse(localStorage.getItem("Legisladores"));
//                     if (arrayObjetos.length !== 0) {
//                         ids = arrayObjetos.map(element => element.id).sort(function (a, b) { return a - b; });
//                         ultimoId = ids[ids.length - 1];
//                         ultimoId++;
//                         id = ultimoId.toString();
//                     }
//                     else {
//                         id = "1";
//                     }
//                 }
//                 break;
//         }
//     }
//     let legislador = new Legislador(id, nombre, apellido, edad, email, radioSexo, radioTipo);
//     return legislador;
// }
