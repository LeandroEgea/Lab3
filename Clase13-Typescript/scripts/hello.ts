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
let funcionEnviarMision1 = function(heroe?:string/*="Spiderman"*/):string {// ? indica que es un parametro opcional
    return heroe + " enviado a Mision 1";
}
let retorno:string = funcionEnviarMision1("Spiderman");
console.log(retorno);

//Parametros REST
let funcionEnviarMision2 = function(...heroes:string[]):void{
    for(let i=0; i<heroes.length;i++){
        console.log(heroes[i] + " enviado a Mision 2");
    } 
}
funcionEnviarMision2("Spiderman", "Hulk");

//funcion flecha
let funcionEnviarMision3 = (heroe:string="black widow"):string=>{
    return heroe + " enviado a la Mision 3"
}
console.log(funcionEnviarMision3())

//tipo en el objeto
let flash:{nombre:string,edad:number,poderes:string[],getNombre:()=>string} =
{
    nombre:"Barry Allen",
    edad: 24,
    poderes: ["corre", "viaja en el tiempo"],
    getNombre(){
        return this.nombre;
    }
}
console.log(flash.poderes);

//tipo personalizado
type Heroe = {nombre:string,edad:number,poderes?:string[], getNombre:()=>string};

let ironman:Heroe = {
    nombre: "Tony Stark",
    edad:24,
    getNombre:function(){return this.nombre;}
}
console.log(ironman.getNombre());

//interfaces
interface IHeroe{
    nombre:string,
    poder?:string,
    mostrar?():string
}