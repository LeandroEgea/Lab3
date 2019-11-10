"use strict";
///  <reference path="bye.ts"/>
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
var funcionEnviarMision = function (heroe /*="Spiderman"*/) {
    return heroe + " enviado";
};
var retorno = funcionEnviarMision("Spiderman");
console.log(retorno);
///  <reference path="hello.ts"/>
var mens;
mens = 'Chau Mundoss';
console.log(mens);
//# sourceMappingURL=output.js.map