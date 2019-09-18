let frm;

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorSubmit);
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevaMascota = obtenerMascota(e.target);
    mascotas.push(nuevaMascota);
    document.getElementById("divTabla").innerHTML = "";
    document.getElementById("divTabla").appendChild(crearTabla(mascotas));
}

function obtenerMascota(frm) {
    let nombre;
    let edad;
    let tipo;
    let castrado;
    let vacunado;
    let desparasitado;
    let alimento;
    for (element of frm.elements) {
        switch (element.name) {
            case "nombre":
                nombre = element.value;
                break;
            case "edad":
                edad = element.value;
                break;
            case "tipo":
                if(element.checked) {
                    tipo = element.value;
                }
                break;
            case "castrado":
                castrado = element.checked;
                break;
            case "vacunado":
                vacunado = element.checked;
                break;
            case "desparasitado":
                desparasitado = element.checked;
                break;
            case "alimento":
                alimento = element.value;
                break;
        }
    }
    return new Mascota(nombre, edad, tipo, castrado, vacunado, desparasitado, alimento);
}
