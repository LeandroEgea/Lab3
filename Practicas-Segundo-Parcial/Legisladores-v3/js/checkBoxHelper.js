function crearBoxes(array, seccion) {
    var divBox = document.getElementById(seccion);
    for (atributo in array[0]) {
        if (atributo != "id") {
            let div = document.createElement("div");
            div.classList.add("form-check");
            let labelA = document.createElement("label");
            labelA.htmlFor = "chk_" + atributo;
            labelA.appendChild(document.createTextNode(atributo));
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "chk_" + atributo;
            checkbox.id = "box";
            checkbox.value = atributo;
            checkbox.checked = true;
            checkbox.onclick = filtrarDatos;
            div.appendChild(labelA);
            div.appendChild(checkbox);
            divBox.appendChild(div);
        } else {
            let div = document.createElement("div");
            divBox.appendChild(div);
        }
    }
    return divBox;
}