//funciones utiles:
//document.createElement("elemento")
//setAttribute('atributo', 'valor');
//appendChild(child);
//createTextNode(valor);

function crearTabla(array) {
    //console.log(array);
    let tabla = document.createElement("table");
    tabla.className = "tabla";

    let cabecera = document.createElement("tr");

    for(i in array[0]){
        let th = document.createElement("th"); 
        th.textContent = i;
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    for(i in array){
        let tr = document.createElement("tr");
        let objeto = array[i];
        for(j in objeto){
            let td = document.createElement("td");
            td.textContent = objeto[j];
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }
    return tabla;
}
