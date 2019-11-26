/// <reference path="ICalculos.ts" />
class Calculos implements ICalculos  {
    calcularEdad(legisladores: Array<Legislador>): void {
        let promedio: number;
        let edades: number[] = legisladores.map(obj => obj.Edad);
        if (edades.length > 0) {
            promedio = edades.reduce((prev, curr) => (prev + curr)) / legisladores.length;
        } else {
            promedio = 0;
        }
        $('#txtInfoEdad').val(promedio.toFixed(2));
    }
    
    calcularGenderMix(legisladores: Array<Legislador>): void {
        let genderMix: number;
        if (legisladores.length > 0) {
            let cantidadMujeres: number = legisladores.filter(obj => obj.Sexo === "Femenino").length;
            genderMix = (cantidadMujeres / legisladores.length) * 100;
        } else {
            genderMix = 0;
        }
        $('#genderMix').val(genderMix.toFixed(2) + " %");
    }
}



