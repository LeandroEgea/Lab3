function crearTabla(array) {
    let tbody = document.createElement("tbody");
    let col = document.createElement("div");
    col.className = "col-12";
    let tabla = document.createElement("table");
    tabla.className = "table tabla table-bordered table-striped table-hover";;
    let cabecera = document.createElement("tr");
    cabecera.className = "thead-dark";

    for (header in array[0]) {
        if(checkType(header) == '0' && header != 'constructor')
        {
            let th = document.createElement("th");
            th.textContent = header;
            cabecera.appendChild(th);
        }
    }
    tbody.appendChild(cabecera)
    tabla.appendChild(tbody);

    for (i in array) {
        let fila = document.createElement("tr");
        fila.className = "table-primary";
        let objeto = array[i];
        for (j in objeto) {
            if(checkType(j) == '0' && j != 'constructor')
            {
                var celda = document.createElement("td");
                var dato = document.createTextNode(objeto[j]);
                celda.appendChild(dato);
                fila.appendChild(celda);
            }
        }
        tbody.appendChild(fila);
        tabla.appendChild(tbody);

    }
    return tabla;
}

// Checks if the start of a word is in LowerCase or UpperCase
function checkType(words) {
    words = String(words).trim();
    const regxs = {
        "lower": /^[a-z]/,
        "upper": /^[a-z]/,
    }
    if (regxs.lower.test(words)) return '0';
    if (regxs.upper.test(words)) return '1';
    return -1;
}
