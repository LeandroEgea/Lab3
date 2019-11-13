"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
//clases
var Avenger2 = /** @class */ (function () {
    function Avenger2(nombre) {
        this.nombre = nombre;
    }
    return Avenger2;
}());
var av2 = new Avenger2("Hulk");
console.log("Clase: " + av2.nombre);
//Clase atrib privado
var Avenger3 = /** @class */ (function () {
    function Avenger3(nombre) {
        var _this = this;
        this._edad = 0;
        this.mostrar = function () { return _this._nombre; };
        this._nombre = nombre;
    }
    Object.defineProperty(Avenger3.prototype, "edad", {
        get: function () { return this._edad; },
        set: function (e) { this._edad = e; },
        enumerable: true,
        configurable: true
    });
    return Avenger3;
}());
var av3 = new Avenger3("Iron Man");
console.log("Clases 2: " + av3.mostrar());
av3.edad = 35;
console.log("Clases 2: " + av3.edad);
//Clases con metodos estaticos
var Xmen = /** @class */ (function () {
    function Xmen() {
    }
    Xmen.nombreDeClase = "Xmen";
    return Xmen;
}());
console.log("atrib estatico" + Xmen.nombreDeClase);
//Herencia
var AvengerHeredado = /** @class */ (function (_super) {
    __extends(AvengerHeredado, _super);
    function AvengerHeredado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AvengerHeredado;
}(Avenger2));
var ah = new AvengerHeredado("Heredado");
console.log(ah.nombre);
//Herencia2
var AvengerHeredado2 = /** @class */ (function (_super) {
    __extends(AvengerHeredado2, _super);
    function AvengerHeredado2(nombre, edad) {
        var _this = _super.call(this, nombre) || this;
        _this.edad = 0;
        _this.edad = edad;
        return _this;
    }
    return AvengerHeredado2;
}(Avenger2));
var ah2 = new AvengerHeredado2("Heredado2", 33);
console.log(ah2.nombre + " " + ah2.edad);
//namespace
var Funciones;
(function (Funciones) {
    function f1() {
        console.log("Yo soy la f1");
    }
    Funciones.f1 = f1;
    function f2() {
        console.log("Yo soy la f2");
    }
    Funciones.f2 = f2;
})(Funciones || (Funciones = {}));
Funciones.f1();
Funciones.f2();
$(function () {
    console.log("ready");
});
///  <reference path="hello.ts"/>
var mensaj;
mensaj = 'Others';
console.log(mensaj);
///  <reference path="other.ts"/>
var mens;
mens = 'Chau Mundoss';
console.log(mens);
//# sourceMappingURL=output.js.map