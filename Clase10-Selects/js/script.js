let selPaises;
let selCiudades;

window.addEventListener('load', function(){
    selPaises = document.getElementById("selPaises");
    selCiudades = document.getElementById("selCiudades");
    cargarSelect(selPaises, obtenerPaises(datos));
    cargarSelect(selCiudades, obtenerCiudades(datos,selPaises.value));

    selPaises.addEventListener('change', () => {
        cargarSelect(selCiudades, obtenerCiudades(datos,selPaises.value));
    })
});

function obtenerPaises(arr){
    return arr.map(obj => obj.pais)
                    .unique()
                    .sort();
}

function obtenerCiudades(arr, pais){
    return arr.filter(obj => obj.pais === pais)
                .map(element=>element.ciudad)
                .unique()
                .sort();
}

function cargarSelect(sel, arr){
    limpiarSelect(sel);
    arr.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        sel.appendChild(option);
    });
}

function limpiarSelect(sel){
    //sel.options.length = 0;
    while (sel.hasChildNodes()) {
        sel.removeChild(sel.firstElementChild);
    }
}

Array.prototype.unique = function(){
    return [...new Set(this)];
}