let primeraVez = true;

$(function () {
    $("#frm").submit(manejadorSubmit);
    $("#lblId").hide();
    $("#idBienes").hide();
    $("#btnLimpiar").hide();
    $("#btnBorrar").hide();
    $("#btnBorrar").click(manejadorBorrar);
    $("#btnLimpiar").click(limpiarForm);
    let arrayBienes = obtenerArrayBienes();
    calcularInfo(arrayBienes);
    cargarGrilla(arrayBienes);
})

function obtenerArrayBienes() {
    let arrayBienes = [];
    arrayObjetos = JSON.parse(localStorage.getItem("BienesRaices"));
    arrayObjetos.forEach(object => {
        let bien = new BienRaiz(object.id, object.titulo, object.descripcion, object.precio, object.banos, object.autos,
            object.dormitorios, object.transaccion)
        arrayBienes.push(bien);
    });
    return arrayBienes;
}

function manejadorSubmit(e) {
    e.preventDefault();
    let arrayBienes = obtenerArrayBienes();
    let nuevoBien = Controller.alta(arrayBienes);
    arrayBienes.push(nuevoBien);
    reestablecerPagina(arrayBienes);
}

function manejadorModificar(e) {
    e.preventDefault();
    let arrayBienes = obtenerArrayBienes();
    arrayBienes = Controller.modificar(arrayBienes);
    reestablecerPagina(arrayBienes);
}

function manejadorBorrar() {
    let arrayBienes = obtenerArrayBienes();
    arrayBienes = Controller.baja(arrayBienes);
    reestablecerPagina(arrayBienes);
}

function cargarGrilla(arrayFiltrados) {
    let tabla = $("#divTabla");
    let checkbox = $("divChk");
    tabla.html('');
    $('tbody', tabla);

    if (primeraVez === true) {
        let arrayBienes = obtenerArrayBienes();
        crearBoxes(arrayBienes, "divChk");
        primeraVez = false;
    }
    checkbox.html('');
    tabla.append(crearTabla(arrayFiltrados));
    let tds = $("td");
    tds.on("click", setValues);
}

function filtrarDatos() {
    let arrayBienes = obtenerArrayBienes();
    let opciones = ['id'];
    //Aca recorro uno por uno todos los checkbox
    $('.box input:checked').each(function () {
        if ($(this).prop('checked') == true) {
            ///Aca meto en un array todos los valores de los checkbox que esten tildados (titulo, descricion etc)
            opciones.push($(this).val());
        }
    });
    //Filtro por el valor del select
    let transaccion = $('#selTransaccion').val();
    let datosFiltradosSel = arrayBienes;
    if (transaccion !== "Todos") {
        datosFiltradosSel = datosFiltradosSel.filter(obj => obj.transaccion === transaccion);
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
    let arrayBienes = obtenerArrayBienes();
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    let dato = arrayBienes.filter(obj => obj.id == nodos[0].innerText);
    //ID
    $("#idBienes").val(dato[0].id);
    $("#idBienes").show();
    $("#lblId").show();

    $("#txtTitulo").val(dato[0].titulo);

    if (dato[0].transaccion == "Venta") {
        $('#transVenta').prop('checked', true);
    } else {
        $('#transAlquiler').prop('checked', true);
    }

    $("#txtDescripcion").val(dato[0].descripcion);
    $("#numPrecio").val(dato[0].precio);
    $("#numBanos").val(dato[0].banos);
    $("#numAutos").val(dato[0].autos);
    $("#numDormitorios").val(dato[0].dormitorios);

    $("#btnCrearModificar").text("Modificar");
    $("#btnBorrar").show();
    $("#frm").off('submit', manejadorSubmit);
    $("#frm").submit(manejadorModificar);
    $("#btnLimpiar").show();
}

function reestablecerPagina(arr) {
    localStorage.setItem("BienesRaices", JSON.stringify(arr));
    reestablecerBoxes(arr);
    cargarDatosSelect();
    limpiarForm();
    calcularInfo(arr);
    cargarGrilla(arr);
}

function limpiarForm() {
    $("#idBienes").hide();
    $("#lblId").hide()
    $("#txtTitulo").val("");
    $("#txtDescripcion").val("");
    $("#numPrecio").val("");
    $("#numBanos").val("");
    $("#numAutos").val("");
    $("#numDormitorios").val("");
    $('#transVenta').prop('checked', true);

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
    let promedio = Calculos.calcularPrecioPromedio(arr);
    $('#txtInfoPrecio').val(promedio.toFixed(2));
}
