<?php

    $nombre = $_GET['nombre'];
    $apellido = $_GET['apellido'];

    if(empty($nombre) || empty($apellido)) {
        echo 'Ingrese nombre y apellido';
    }
    else {
        echo "Hola ".$nombre." ".$apellido;
    }

?>