let frm;

window.addEventListener('load', inicializarManejadores);
window.addEventListener('load', traerAnuncios);

function inicializarManejadores() {
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorSubmit);
    document.getElementById("btnBorrar").addEventListener('click', borrarAnuncio);
    document.getElementById("btnLimpiar").addEventListener('click', manejadorLimpiar);
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
    frm.removeEventListener('submit', manejadorModificar);
    frm.addEventListener('submit', manejadorSubmit);
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
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            traerAnuncios();
            limpiarValues();
        } else {
            document.getElementById('divTabla').innerHTML =
                '<img src="./img/spinner.gif" alt="spinner">';
        }
    }
    xhr.open('POST', 'http://localhost:3000/altaAnuncio', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(anuncio));
}


function traerAnuncio(){
    let xhr = new XMLHttpRequest();
    tabla = document.getElementById("tabla");
    xhr.onreadystatechange(() => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let objects = JSON.parse(xhr.responseText);
            tabla.innerHTML = "";
            tabla.appendChild(crearTabla(objects.data));
            let tds = document.getElementsByTagName("td");
            for(i = 0; i <tds.length ; i++){
                tds[i].addEventListener('click', setValues);
            }
        }else{
            tabla.innerHTML = "";
            tabla.innerHTML = "<img src='./whatever.gif' alt='sniper'>";
        }
    });
    xhr.open('GET', "http://localhost:3000/traerAnuncios", true);
    //xhr.setRequestHeader("Content-type", "Application/x-www-form-urlencoded");
    xhr.send();
}




function traerAnuncios() {
    let xhr = new XMLHttpRequest();
    let divTabla = document.getElementById('divTabla');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let anuncios = JSON.parse(xhr.responseText);
            divTabla.innerHTML = "";
            divTabla.appendChild(crearTabla(anuncios.data));
            let tds = document.getElementsByTagName("td");
            for (var i = 0; i < tds.length; i++) {
                let td = tds[i];
                td.addEventListener('click', setValues);
            }
        } else {
            divTabla.innerHTML = '<img src="./img/spinner.gif" alt="spinner">';
        }
    }
    xhr.open('GET', "http://localhost:3000/traerAnuncios", true);
    xhr.send();
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    document.getElementById("idAnuncio").value = nodos[0].innerText;
    document.getElementById("idAnuncio").hidden = false;

    document.getElementById("lblId").hidden = false;
    document.getElementById("titulo").value = nodos[1].innerText;
    document.getElementById("descripcion").value = nodos[3].innerText;
    let valorTransaccion = nodos[2].innerText;
    if (valorTransaccion == "Venta") {
        document.getElementById("venta").checked = true;
    } else if (valorTransaccion == "Alquiler") {
        document.getElementById("alquiler").checked = true;
    }
    document.getElementById("precio").value = nodos[4].innerText;
    document.getElementById("banos").value = nodos[5].innerText;
    document.getElementById("dormitorios").value = nodos[7].innerText;
    document.getElementById("cocheras").value = nodos[6].innerText;

    document.getElementById("btnCrearModificar").innerText = "Modificar";
    document.getElementById("btnBorrar").hidden = false;
    document.getElementById("btnLimpiar").hidden = false;
    frm.removeEventListener('submit', manejadorSubmit);
    frm.addEventListener('submit', manejadorModificar);
}

function borrarAnuncio() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            traerAnuncios();
            limpiarValues();
            frm.removeEventListener('submit', manejadorModificar);
            frm.addEventListener('submit', manejadorSubmit);
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
            frm.removeEventListener('submit', manejadorModificar);
            frm.addEventListener('submit', manejadorSubmit);
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