///  <reference path="bye.ts"/>
let mensaje:string;
mensaje = 'Hola mundos';
console.log(mensaje);
/*
///Array
let vector:number[] = [1,2,3,4];
///Tupla = vector de lo que quieras
let tupla:[number,string] = [1, "Ironman"];
*/
//Enum
enum Eheroe{
    Xmen,
    Avenger
}
console.log("Enum..");
console.log(Eheroe.Avenger);
console.log(Eheroe[Eheroe.Avenger]);
for(let key in Eheroe)
{
    console.log(key);
}

//Funciones                                 Esto indica un parametro por defecto
let funcionEnviarMision = function(heroe?:string/*="Spiderman"*/):string {// ? indica que es un parametro opcional
    return heroe + " enviado";
}

let retorno:string = funcionEnviarMision("Spiderman");
console.log(retorno);