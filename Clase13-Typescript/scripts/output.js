"use strict";
var mensaje;
mensaje = 'Hola mundos';
console.log(mensaje);
/*
///Array
let vector:number[] = [1,2,3,4];
///Tupla = vector de lo que quieras
let tupla:[number,string] = [1, "Ironman"];
*/
//Enum
var Eheroe;
(function (Eheroe) {
    Eheroe[Eheroe["Xmen"] = 0] = "Xmen";
    Eheroe[Eheroe["Avenger"] = 1] = "Avenger";
})(Eheroe || (Eheroe = {}));
console.log("Enum..");
console.log(Eheroe.Avenger);
console.log(Eheroe[Eheroe.Avenger]);
for (var key in Eheroe) {
    console.log(key);
}
//Funciones                                 Esto indica un parametro por defecto
var funcionEnviarMision1 = function (heroe /*="Spiderman"*/) {
    return heroe + " enviado a Mision 1";
};
var retorno = funcionEnviarMision1("Spiderman");
console.log(retorno);
//Parametros REST
var funcionEnviarMision2 = function () {
    var heroes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        heroes[_i] = arguments[_i];
    }
    for (var i = 0; i < heroes.length; i++) {
        console.log(heroes[i] + " enviado a Mision 2");
    }
};
funcionEnviarMision2("Spiderman", "Hulk");
//funcion flecha
var funcionEnviarMision3 = function (heroe) {
    if (heroe === void 0) { heroe = "black widow"; }
    return heroe + " enviado a la Mision 3";
};
console.log(funcionEnviarMision3());
//tipo en el objeto
var flash = {
    nombre: "Barry Allen",
    edad: 24,
    poderes: ["corre", "viaja en el tiempo"],
    getNombre: function () {
        return this.nombre;
    }
};
console.log(flash.poderes);
var ironman = {
    nombre: "Antonio Stark",
    edad: 24,
    getNombre: function () { return this.nombre; }
};
console.log(ironman.getNombre());
var lobezno = {
    nombre: "Jaime"
};
console.log(lobezno.nombre);
//Impl
var Avenger = /** @class */ (function () {
    function Avenger() {
        this.nombre = "vengador";
    }
    return Avenger;
}());
var Mutant = /** @class */ (function () {
    function Mutant() {
        this.nombre = "mutante";
    }
    return Mutant;
}());
var unAvenger = new Avenger();
var unMutante = new Mutant();
console.log(unAvenger.nombre);
console.log(unMutante.nombre);
var miFuncion;
miFuncion = function (num1, num2) { return num1 + num2; };
console.log(miFuncion(1, 2));
///  <reference path="hello.ts"/>
var mensaj;
mensaj = 'Others';
console.log(mensaj);
///  <reference path="other.ts"/>
var mens;
mens = 'Chau Mundoss';
console.log(mens);
//# sourceMappingURL=output.js.map