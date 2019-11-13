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
    nombre: "Antonio Stark",
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
let lobezno:IHeroe = {
    nombre: "Jaime"
}
console.log(lobezno.nombre);

//Impl
class Avenger implements IHeroe{
    nombre:string = "vengador"
}
class Mutant implements IHeroe{
    nombre:string = "mutante"
}
let unAvenger = new Avenger();
let unMutante = new Mutant();
console.log(unAvenger.nombre);
console.log(unMutante.nombre);

//interfaz en funcion
interface IfuncDosNumeros{
    (num1:number,num2:number):number;
}
let miFuncion:IfuncDosNumeros;
miFuncion = (num1:number,num2:number)=>num1+num2;
console.log(miFuncion(1,2));

//clases
class Avenger2 implements IHeroe{
    nombre:string;

    constructor(nombre:string){
        this.nombre = nombre;
    }
}
let av2 = new Avenger2("Hulk");
console.log("Clase: "+ av2.nombre);

//Clase atrib privado
class Avenger3{
    private _nombre:string;
    private _edad:number = 0;
    constructor(nombre:string){
        this._nombre = nombre
    }
    get edad():number{return this._edad;}
    set edad(e:number){this._edad = e;}

    public mostrar = ()=>this._nombre;
}
let av3 = new Avenger3("Iron Man");
console.log("Clases 2: " + av3.mostrar());
av3.edad = 35;
console.log("Clases 2: " + av3.edad);

//Clases con metodos estaticos
class Xmen{
    static nombreDeClase = "Xmen";
}
console.log("atrib estatico" + Xmen.nombreDeClase);

//Herencia
class AvengerHeredado extends Avenger2{

}
let ah = new AvengerHeredado("Heredado");
console.log(ah.nombre);

//Herencia2
class AvengerHeredado2 extends Avenger2{
    edad:number=0;
    constructor(nombre:string,edad:number){
        super(nombre);
        this.edad = edad;
    }
}
let ah2 = new AvengerHeredado2("Heredado2",33);
console.log(ah2.nombre + " " + ah2.edad);