$(function () {
    inicializarManejadores();
    traerAnuncios();
});

function inicializarManejadores() {
    $("#frm").submit(manejadorSubmit);
    $("#btnBorrar").click(borrarAnuncio);
    $("#btnLimpiar").click(manejadorLimpiar);
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    altaAnuncio(nuevoAnuncio);
}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target, true);
    modificarAnuncio(anuncio);
}

function manejadorLimpiar(e) {
    e.preventDefault();
    limpiarValues();
    $("#btnLimpiar").click(manejadorLimpiar);
    $("#frm").off("submit");
    $("#frm").submit(manejadorSubmit);
}

function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let descripcion;
    let tipo;
    let precio;
    let banos;
    let dormitorios;
    let cocheras;
    let id = -1;
    for (element of frm.elements) {
        switch (element.name) {
            case "titulo":
                titulo = element.value;
                break;
            case "descripcion":
                descripcion = element.value;
                break;
            case "tipo":
                if (element.checked === true) {
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
            case "idAnuncio":
                if (tieneId == true) {
                    id = element.value;
                } else {
                    id = -1;
                }
                break;
        }
    }
    return new Anuncio(id, titulo, descripcion, tipo, precio, banos, dormitorios, cocheras);
}

function altaAnuncio(anuncio) {
    altaDato(anuncio, () => {
        traerAnuncios();
        limpiarValues();
    });
}

function traerAnuncio() {
    let xhr = new XMLHttpRequest();
    //TODO cambiar por jquery
    tabla = document.getElementById("tabla");
    xhr.onreadystatechange(() => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let objects = JSON.parse(xhr.responseText);
            tabla.innerHTML = "";
            tabla.appendChild(crearTabla(objects.data));
            let tds = document.getElementsByTagName("td");
            for (i = 0; i < tds.length; i++) {
                tds[i].addEventListener('click', setValues);
            }
        } else {
            tabla.innerHTML = "";
            tabla.innerHTML = "<img src='./whatever.gif' alt='sniper'>";
        }
    });
    xhr.open('GET', "http://localhost:3000/traerAnuncios", true);
    //xhr.setRequestHeader("Content-type", "Application/x-www-form-urlencoded");
    xhr.send();
}

function traerAnuncios() {
    cargarDatos((anuncios) => {
        $("#divTabla").append(crearTabla(anuncios));
        $("td").each(function() {
            $(this).click(setValues);
        });
    });
}

function setValues(e) {
    //TODO cambiar por jquery
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    $("#idAnuncio").val(nodos[0].innerText);
    $("#idAnuncio").hide();

    $("#lblId").hide();
    $("#lblId").hide();
    $("#titulo").val(nodos[1].innerText);
    $("#descripcion").val(nodos[3].innerText);
    let valorTransaccion = nodos[2].innerText;
    if (valorTransaccion == "Venta") {
        $("#venta").prop('checked', true);
    } else if (valorTransaccion == "Alquiler") {
        $("#alquiler").prop('checked', true);
    }
    $("#precio").val(nodos[4].innerText);
    $("#banos").val(nodos[5].innerText);
    $("#dormitorios").val(nodos[7].innerText);
    $("#cocheras").val(nodos[6].innerText);

    document.getElementById("btnCrearModificar").innerText = "Modificar";
    $("#btnBorrar").show();
    $("#btnLimpiar").show();

    $("#frm").off("submit");
    $("#frm").submit(manejadorModificar);
}

function borrarAnuncio() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            traerAnuncios();
            limpiarValues();
            $("#frm").off("submit");
            $("#frm").submit(manejadorSubmit);
        } else {
            document.getElementById('divTabla').innerHTML =
                '<img src="./img/spinner.gif" alt="spinner">';
        }
    }
    xhr.open('POST', 'http://localhost:3000/bajaAnuncio?', true);
    xhr.setRequestHeader('Content-type', 'Application/x-www-form-urlencoded');
    xhr.send(obtenerId(frm));
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idAnuncio") {
            return `id=${element.value}`;
        }
    }
}

function limpiarValues() {
    //TODO cambiar por jquery
    document.getElementById("idAnuncio").value = "";
    document.getElementById("idAnuncio").hidden = true;

    document.getElementById("lblId").hidden = true;
    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("venta").checked = true;
    document.getElementById("precio").value = 0;
    document.getElementById("banos").value = 1;
    document.getElementById("dormitorios").value = 1;
    document.getElementById("cocheras").value = 1;

    document.getElementById("btnCrearModificar").innerText = "Crear";
    document.getElementById("btnBorrar").hidden = true;
    document.getElementById("btnLimpiar").hidden = true;
}

function modificarAnuncio(anuncio) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            traerAnuncios();
            limpiarValues();
            $("#frm").off("submit");
            $("#frm").submit(manejadorSubmit);
        } else {
            document.getElementById('divTabla').innerHTML =
                '<img src="./img/spinner.gif" alt="spinner">';
        }
    }
    xhr.open('POST', 'http://localhost:3000/modificarAnuncio', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    anuncio.active = "true";
    xhr.send(JSON.stringify(anuncio));
}