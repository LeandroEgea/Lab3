<?php

    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];

    if(empty($nombre) || empty($apellido)) {
        echo 'Ingrese nombre y apellido';
    }
    else {
        echo "Hola ".$nombre." ".$apellido;
    }

?>