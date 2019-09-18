function operar(a, b, callback){
    return callback(a, b);
}

console.log("la respuesta es " + operar(4, 5, restar));

function sumar(x, y){
    return x + y;
}

function restar(x, y){
    return x - y;
}

function multiplicar(x, y){
    return x * y;
}

function dividir(x, y){
    let z;
    if(x != 0){
        z = x / y;
    }
    return z;
}