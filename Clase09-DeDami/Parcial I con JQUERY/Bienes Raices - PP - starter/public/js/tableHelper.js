//funciones utiles:
//document.createElement("elemento")
//setAttribute('atributo', 'valor');
//appendChild(child);
//createTextNode(valor);


function crearTabla(array) {
    var tabla = document.createElement("table");
    tabla.className = "tabla";

    let cabecera = document.createElement("tr");
    //Completando cabecera
    for (headers in array[0]) {
        let th = document.createElement("th");
        th.textContent = headers;
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    for (i in array) {

        let fila = document.createElement("tr");
        let objeto = array[i];
        for (j in objeto) {
            var celda = document.createElement("td");
            var dato = document.createTextNode(objeto[j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}
