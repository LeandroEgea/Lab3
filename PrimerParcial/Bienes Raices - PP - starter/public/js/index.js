//ATRIBUTOS DE ANUNCIO
//id,titulo,transaccion,descripcion,precio,num_wc,num_estacionamiento,num_dormitorio;

//////////////////////LLAMADAS AJAX/////////////////////////////////

let frm;

window.addEventListener('load', iniciarManejadores);
window.addEventListener('load', cargarDatos);

function iniciarManejadores(){
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorAlta);
    document.getElementById("btnBorrar").addEventListener('click', manejadorBaja);
    document.getElementById("btnLimpiar").addEventListener('click', manejadorLimpiar);
}

function manejadorAlta(e){
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target);
    crearAnuncio(anuncio);
}

function manejadorBaja(){
    let anuncio = obtenerAnuncio(frm);
    borrarAnuncio(anuncio);
}

function manejadorModificar(e){
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target);
    modificarAnuncio(anuncio);
}

function manejadorLimpiar(){
    vaciarForm();
    frm.removeEventListener('submit', manejadorModificar);
    frm.addEventListener('submit', manejadorAlta); 
}

function cargarDatos() {
    var xhr = new XMLHttpRequest();
    let divTabla = document.getElementById("divTabla");
    xhr.onreadystatechange = function () {
        //validar readyState y status
        //si todo está OK, parseo la respuesta(responseText) y genero el array de anuncios
        if(this.readyState == 4) {
            if(this.status == 200) {
                let respuesta = JSON.parse(xhr.responseText);
                divTabla.innerHTML = "";
                divTabla.appendChild(crearTabla(respuesta.data));
                let tds = document.getElementsByTagName("td");
                for(let i = 0; i<tds.length; i++){
                    tds[i].addEventListener('click', llenarForm);
                }
            }
        }
        else {
            divTabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }
    };
    //Envio la peticion get
    var url = "http://localhost:3000/traerAnuncios";
    xhr.open("GET", url, true);
    xhr.send();
}

function llenarForm(e){
    tr = e.target.parentElement;
    let nodes = tr.childNodes;
    document.getElementById("id").value = nodes[0].innerText;
    document.getElementById("id").hidden = false;
    document.getElementById("lblId").hidden = false;

    document.getElementById("titulo").value = nodes[1].innerText;

    let transaccion = nodes[2].innerText;
    if(transaccion == "Venta"){
        document.getElementById("venta").checked = true;
    }else {
        document.getElementById("alquiler").checked = true;
    }

    document.getElementById("descripcion").value = nodes[3].innerText;
    document.getElementById("precio").value = nodes[4].innerText;
    document.getElementById("num_wc").value = nodes[5].innerText;
    document.getElementById("num_estacionamiento").value = nodes[6].innerText;
    document.getElementById("num_dormitorio").value = nodes[7].innerText;

    document.getElementById("btnCrearModificar").innerText = "Modificar";
    document.getElementById("btnBorrar").hidden = false;  
    document.getElementById("btnLimpiar").hidden = false;   
    frm.removeEventListener('submit', manejadorAlta); 
    frm.addEventListener('submit', manejadorModificar);
}

function vaciarForm(){
    document.getElementById("id").value = "0";
    document.getElementById("id").hidden = true;
    document.getElementById("lblId").hidden = true;

    document.getElementById("titulo").value = "";
    document.getElementById("venta").checked = true;
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "0";
    document.getElementById("num_wc").value = "1";
    document.getElementById("num_estacionamiento").value = "1";
    document.getElementById("num_dormitorio").value = "1";

    document.getElementById("btnCrearModificar").innerText = "Crear";
    document.getElementById("btnBorrar").hidden = true; 
    document.getElementById("btnLimpiar").hidden = true;     
}

function obtenerAnuncio(frm){
    let id;
    let titulo;
    let transaccion;
    let descripcion;
    let precio;
    let num_wc;
    let num_estacionamiento;
    let num_dormitorio;

    for(element of frm.elements){
        switch(element.name){
            case "id":
                id = element.value;
                break;
            case "titulo":
                titulo = element.value;
                break;
            case "transaccion":
                if(element.checked){
                    transaccion = element.value;
                }
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
        }
    }
    return new Anuncio(id,titulo,transaccion,descripcion,precio,num_wc,num_estacionamiento,num_dormitorio);
}

function crearAnuncio(anuncio){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(this.readyState == 4) {
            if(this.status == 200) {
                cargarDatos();
                vaciarForm();
            } 
        } else {
            divTabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }
    };
    var url = "http://localhost:3000/altaAnuncio";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(anuncio));
}

function borrarAnuncio(anuncio){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(this.readyState == 4) {
            if(this.status == 200) {
                cargarDatos();
                vaciarForm();
                frm.removeEventListener('submit', manejadorModificar);
                frm.addEventListener('submit', manejadorAlta); 
            } 
        } else {
            divTabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }
    };
    var url = "http://localhost:3000/bajaAnuncio";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(anuncio));
}

function modificarAnuncio(anuncio){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(this.readyState == 4) {
            if(this.status == 200) {
                cargarDatos();
                vaciarForm();
                frm.removeEventListener('submit', manejadorModificar);
                frm.addEventListener('submit', manejadorAlta); 
            } 
        } else {
            divTabla.innerHTML = "<img src='./img/831.gif' alt='spinner'>";
        }
    };
    var url = "http://localhost:3000/modificarAnuncio";
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(anuncio));
}