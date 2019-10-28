function crearTabla(array) {
    var tabla = document.createElement("table");
    tabla.className = 'tabla';

    let cabeceraCheckbox = document.createElement("tr");
    for (atributo in array[0]) {
        let th = document.createElement("th");
        var checkbox = document.createElement('input'); 
              
        checkbox.type = "checkbox"; 
        checkbox.name = "chk" + atributo; 
        checkbox.checked = true;
        checkbox.id = "chk" + atributo; 

        th.appendChild(checkbox);
        cabeceraCheckbox.appendChild(th);
    }
    tabla.appendChild(cabeceraCheckbox);

    let cabecera = document.createElement("tr");
    for (atributo in array[0]) {
        let th = document.createElement("th");
        th.textContent = atributo;
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    for (i in array) {
        var fila = document.createElement("tr");
        var objeto = array[i];

        for (j in objeto) {
            var celda = document.createElement("td");
            celda.textContent = objeto[j];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}