//ATRIBUTOS DE ANUNCIO
//id,titulo,transaccion,descripcion,precio,num_wc,num_estacionamiento,num_dormitorio;
$(function() {
    inicializarManejadores();
})

function inicializarManejadores() {
    $("#frm").submit(manejadorSubmit);
    $("#btnBorrar").click(borrarAnuncio);
    cargarGrilla();

}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    console.log(nuevoAnuncio);
    altaAnuncio(nuevoAnuncio);

}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target, true);
    //console.log(anuncio);
    modificarAnuncio(anuncio);

}

//////////////////////LLAMADAS AJAX/////////////////////////////////
function cargarGrilla() {
    let tabla = $("#divTabla");
    let impresion_grilla = function() {
        tabla.append(crearTabla(datos));

        let tds = $("#td");
        $("td").each(() => {
            // $(this).click(setValues);
        })
    }
    cargarDatos(impresion_grilla);
}

function altaAnuncio(nuevoAnuncio) {
    //var xhr = new XMLHttpRequest();
    let tabla = $("#divTabla");
    altaDatos(() => {
        limpiarForm();
        cargarGrilla();
    }, nuevoAnuncio)



}

function modificarAnuncio(nuevoAnuncio) {
    var xhr = new XMLHttpRequest();
    let tabla = document.getElementById("divTabla");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            tabla.innerText = "";
            cargarDatos();
        } else {
            tabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }

    };
    //Envio la peticion get
    var url = "http://localhost:3000/modificarAnuncio";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'Application/json');
    xhr.send(JSON.stringify(nuevoAnuncio));
}

function borrarAnuncio() {
    var xhr = new XMLHttpRequest();
    let tabla = document.getElementById("divTabla");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            tabla.innerText = "";
            cargarDatos();
            limpiarForm();
        } else {
            tabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }

    };
    //Envio la peticion get
    var url = "http://localhost:3000/bajaAnuncio";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'Application/x-www-form-urlencoded');
    xhr.send(obtenerId(frm));
}


function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let descripcion;
    let precio;
    let num_wc;
    let num_estacionamiento;
    let num_dormitorio;
    let transaccion;
    let id = -1;
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
                    console.log("entro");
                    id = element.value;
                } else {
                    id = element.value;
                }
                break;
        }
    }
    return new Anuncio(id, titulo, descripcion, transaccion, precio, num_wc, num_dormitorio, num_estacionamiento);
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    $("#idAnuncio").val = nodos[0].innerText;
    $("#idAnuncio").hide;

    $("#lblId").hide;
    document.getElementById("titulo").value = nodos[1].innerText;
    if (nodos[2].innerHTML == "Venta") {
        document.getElementById("transaccionVenta").checked = true;
    } else {
        document.getElementById("transaccionAlquiler").checked = true;
    }
    document.getElementById("descripcion").value = nodos[3].innerText;
    document.getElementById("precio").value = nodos[4].innerText;
    document.getElementById("num_wc").value = nodos[5].innerText;
    document.getElementById("num_estacionamiento").value = nodos[6].innerText;
    document.getElementById("num_dormitorio").value = nodos[7].innerText;

    document.getElementById("btnCrearModificar").innerText = "Modificar";
    document.getElementById("btnBorrar").hidden = false;
    frm.removeEventListener('submit', manejadorSubmit);
    frm.addEventListener('submit', manejadorModificar);
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idAnuncio") {
            return `id=${element.value}`;
        }
    }
}

function limpiarForm() {
    document.getElementById("idAnuncio").hidden = true;
    document.getElementById("lblId").hidden = true;
    document.getElementById("descripcion").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("num_wc").value = "";
    document.getElementById("num_estacionamiento").value = "";
    document.getElementById("num_dormitorio").value = "";
    document.getElementById("transaccionAlquiler").checked = false;
    document.getElementById("transaccionVenta").checked = false;

    document.getElementById("btnCrearModificar").innerText = "Crear";
    document.getElementById("btnBorrar").hidden = true;
    frm.removeEventListener('submit', manejadorModificar);
    frm.addEventListener('submit', manejadorSubmit);

}