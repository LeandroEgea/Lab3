window.addEventListener('load', () => {
    document.getElementById('btnTraer').addEventListener('click', traerTexto)
});

function traerTexto() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        //codigo que maneja la peticion
        let info = document.getElementById('info');
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                setTimeout(() => {
                    let lista = JSON.parse(xhr.responseText);
                    info.innerHTML = "";
                    //tirarle esto a la tabla
                    for(persona of lista) {
                        info.innerHTML += `${persona.id} - ${persona.nombre} - ${persona.email} - ${persona.email} <hr/>`;
                    }
                    clearTimeout(tiempo);
                }, 3000);
            }
            else {
                console.log(`Error: ${xhr.status} - ${xhr.statusText}`)
            }
        }
        else {
            info.innerHTML = '<img src="./images/spinner.gif" alt="spinner">';
        }
    }
    xhr.open('GET', './personas.json', true);
    xhr.send();
    let tiempo = setTimeout(() => {
        xhr.abort();
        info.innerHTML = 'Servidor ocupado. Intente mas tarde';
    }, 4000);
}