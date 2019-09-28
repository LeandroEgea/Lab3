let frm;

window.addEventListener('load', inicializarManejadores);
window.addEventListener('load', armarTabla);

function inicializarManejadores() {
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorSubmit);
    document.getElementById("btnBorrar").addEventListener('click', borrarPersona);
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevaPersona = obtenerPersona(e.target);
    altaPersona(nuevaPersona);
}

function obtenerPersona(frm) {
    let nombre;
    let apellido;
    let edad;
    for (element of frm.elements) {
        switch (element.name) {
            case "nombre":
                nombre = element.value;
                break;
            case "apellido":
                apellido = element.value;
                break;
            case "edad":
                edad = element.value;
                break;
        }
    }
    return new Persona(nombre, apellido, edad);
}

function altaPersona(persona) {
    let xhr = new XMLHttpRequest();
    // manejador de eventos que se ejecuta cada vez que cambia el estado
    xhr.onreadystatechange = () => {
        // se actualiza la tabla cuando se haya completado la request correctamente
        if (xhr.readyState == 4 && xhr.status == 200) {
            armarTabla();
            // document.getElementById("divTabla").innerHTML = "";
            // getPersonas().then((personas) => {
            //     console.log(personas);
            //     //document.getElementById("divTabla").appendChild(crearTabla(personas));
            // });
        }
    }
    xhr.open('POST', 'http://localhost:3000/altaPersona', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(persona));
}

function armarTabla() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                document.getElementById("divTabla").innerHTML = "";
                let personas = JSON.parse(xhr.responseText);
                document.getElementById("divTabla").appendChild(crearTabla(personas));
                let tds = document.getElementsByTagName("td");
                for (var i = 0; i < tds.length; i++) {
                    let td = tds[i];
                    td.addEventListener('click', setValues);
                }
            } else {
                console.log(`Error: ${xhr.status} - ${xhr.statusText}`)
            }
        }
    }
    xhr.open('GET', 'http://localhost:3000/traerPersonas', true);
    xhr.send();
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    document.getElementById("idPersona").value = nodos[0].innerText;
    document.getElementById("idPersona").hidden = false;
    //grisarlo
    document.getElementById("lblId").hidden = false;
    document.getElementById("nombre").value = nodos[1].innerText;
    document.getElementById("apellido").value = nodos[2].innerText;
    document.getElementById("edad").value = nodos[3].innerText;

    document.getElementById("btnCrearModificar").innerText = "Modificar";
    document.getElementById("btnBorrar").hidden = false;
}

function borrarPersona() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            armarTabla();
        }
    }
    xhr.open('POST', 'http://localhost:3000/bajaPersona', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(obtenerId(frm));
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idPersona") {
            return JSON.stringify(element.value);
        }
    }
}

// function getPersonas() {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState == 4) {
//             if (xhr.status == 200) {
//                 return JSON.parse(xhr.responseText);
//             } else {
//                 console.log(`Error: ${xhr.status} - ${xhr.statusText}`)
//             }
//         }
//     }
//     xhr.open('GET', 'http://localhost:3000/traerPersonas', true);
//     xhr.send();
// }