function modificarAnuncio(nuevoAnuncio, arrayAnuncios) {
    arrayAnuncios.push(nuevoAnuncio);
    localStorage.setItem("Anuncios", JSON.stringify(arrayAnuncios));
    cargarGrilla(arrayAnuncios);
}







/*
function cargarDatos(manejador) {
    datos = [];
    $.getJSON("http://localhost:3000/traerAnuncios", function(resp, status) {
        for (var i = 0; i < resp.data.length; i++) {
            datos.push(new Anuncio(resp.data[i].id, resp.data[i].titulo, resp.data[i].descripcion,
                resp.data[i].transaccion, resp.data[i].precio,
                resp.data[i].num_wc, resp.data[i].num_estacionamiento, resp.data[i].num_dormitorio));
        }
        if (manejador) {
            manejador();
        }
        return datos;
    });
};

function altaDatos(objeto, array) {
    $.post("http://localhost:3000/altaAnuncio", objeto, 'json');
}





function borrarAnuncio() {
    var xhr = new XMLHttpRequest();
    let tabla = document.getElementById("divTabla");
    xhr.onreadystatechange = function () {
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
*/