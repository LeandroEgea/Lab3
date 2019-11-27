class Calculos  {
    public static calcularPrecioPromedio(bienes: Array<BienRaiz>): number {
        let promedio: number;
        let precios: number[] = bienes.map(obj => obj.Precio);
        if (precios.length > 0) {
            promedio = precios.reduce((prev, curr) => (prev + curr)) / precios.length;
        } else {
            promedio = 0;
        }
        return promedio;
    }
}



