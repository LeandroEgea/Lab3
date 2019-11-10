//ATRIBUTOS DE ANUNCIO
//id,titulo,transaccion,descripcion,precio,num_wc,num_estacionamiento,num_dormitorio;
let primeraVez = true;
let arrayAnuncios;
$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
    //localStorage.setItem("Anuncios", JSON.stringify(datos));
    $("#frm").submit(manejadorSubmit);
    //$("#btnBorrar").click(borrarAnuncio);
    $("#btnLimpiar").click(limpiarForm);
    arrayAnuncios = JSON.parse(localStorage.getItem("Anuncios"));
    cargarGrilla(arrayAnuncios); //reemplazar datoscon JSON.parse(localstorage.getItem("Anuncio"));


}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    //console.log(nuevoAnuncio);
    altaAnuncio(nuevoAnuncio);

}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target, true);
    //console.log(anuncio);
    //modificarAnuncio(anuncio, arrayAnuncios);
    for(i=0; i<arrayAnuncios.length;i++)
    {
        if(arrayAnuncios[i].id === anuncio.id)
        {
            arrayAnuncios.splice(i, 2, anuncio);
        }
    }
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    let checkboxs = $('.box input');
    checkboxs.prop("checked", true);
    cargarGrilla(arrayAnuncios);


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

function filtrarDatos() {
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
    let cantBanios = $('#selBaños').val();
    let datosFiltradosSel = arrayAnuncios;
    if (transaccion !== "Todos") {
        datosFiltradosSel = datosFiltradosSel.filter(obj => obj.transaccion === transaccion);
    }
    if (cantBanios !== "Todos") {
        datosFiltradosSel = datosFiltradosSel.filter(obj => obj.num_wc >= cantBanios);
    }
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

function altaAnuncio(nuevoAnuncio) {
    //alert("Ya no anda esto maestro, no rompas las bolas");
    arrayAnuncios.push(nuevoAnuncio);
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    cargarGrilla(arrayAnuncios);

}


function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let descripcion;
    let precio;
    let num_wc;
    let num_estacionamiento;
    let num_dormitorio;
    let transaccion;
    let id;
    for (element of frm.elements) {
        switch (element.name) {
            case "titulo":
                titulo = element.value;
                break;
            case "descripcion":
                descripcion = element.value;
                break;
            case "precio":
                precio = element.value;
                break;
            case "num_wc":
                num_wc = element.value;
                break;
            case "num_estacionamiento":
                num_estacionamiento = element.value;
                break;
            case "num_dormitorio":
                num_dormitorio = element.value;
                break;
            case "transaccion":
                if (element.checked === true) {
                    transaccion = element.value;
                }
                break;
            case "idAnuncio":
                if (tieneId === true) {
                    id = element.value;
                } else {
                    id = element.value;
                    ids = arrayAnuncios.map(element => element.id).sort(function (a, b) { return a - b; });
                    ultimoId = ids[ids.length - 1];
                    ultimoId++;
                    id = ultimoId.toString();
                }
                break;
        }
    }
    return new Anuncio(id, titulo, descripcion, transaccion, precio, num_wc, num_dormitorio, num_estacionamiento);
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    let dato = arrayAnuncios.filter(obj => obj.id === nodos[0].innerText);
    //ID
    $("#idAnuncio").val(dato[0].id);
    $("#idAnuncio").show();
    $("#lblId").show();
    //Titulo
    $("#titulo").val(dato[0].titulo);
    //Transaccion
    if (dato[0].transaccion == "Venta") {
        $('#transaccionVenta').prop('checked', true);
    } else {
        $('#transaccionAlquiler').prop('checked', true);
    }
    //Descripcion
    $("#descripcion").val(dato[0].descripcion);
    //Precio
    $("#precio").val(dato[0].precio);
    //Num WC
    $("#num_wc").val(dato[0].num_wc);
    //Num Estancionamiento
    $("#num_estacionamiento").val(dato[0].num_estacionamiento);
    //Num Dormitorio
    $("#num_dormitorio").val(dato[0].num_dormitorio);

    $("#btnCrearModificar").text("Modificar");
    $("#btnBorrar").show();
    $("#frm").off('submit', manejadorSubmit);
    $("#frm").submit(manejadorModificar);
    $("#btnLimpiar").show();
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idAnuncio") {
            return `id=${element.value}`;
        }
    }
}

function limpiarForm() {
    $("#idAnuncio").hide();
    $("#lblId").hide()
    $("#descripcion").val("");
    $("#titulo").val("");
    $("#precio").val("");
    $("#num_wc").val("");
    $("#num_estacionamiento").val("");
    $("#num_dormitorio").val("");
    $('#transaccionVenta').prop('checked', false);
    $('#transaccionAlquiler').prop('checked', false);

    $("#btnCrearModificar").text("Crear");
    $("#btnLimpiar").hide();
    $("#btnBorrar").hide();
    fr$("#frm").off('submit', manejadorModificar);
    $("#frm").submit(manejadorSubmit);

}