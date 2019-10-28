function cargarDatos(manejador) {
    datos = [];
    $.getJSON("http://localhost:3000/traerAnuncios", function (resp, status) {
        for (var i = 0; i < resp.data.length; i++) {
            datos.push(new Anuncio(resp.data[i].id, resp.data[i].titulo, resp.data[i].descripcion,
                resp.data[i].transaccion, resp.data[i].precio,
                resp.data[i].num_wc, resp.data[i].num_dormitorio, resp.data[i].num_estacionamiento));
        }
        if (manejador) {
            manejador(datos);
        }
    });
    // else {
    //     divTabla.innerHTML = '<img src="./img/spinner.gif" alt="spinner">';
    // }
};

function altaDato(objeto, manejador) {
    $.post('http://localhost:3000/altaAnuncio', objeto, function() {
        if (manejador) {
            manejador();
        }
    });
}