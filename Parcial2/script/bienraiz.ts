/// <reference path="anuncio.ts" />

class BienRaiz extends Anuncio {

    private banos: number;
    private autos: number;
    private dormitorios: number;
    private transaccion: ETransaccion;

    constructor(id: number, titulo: string, descripcion: string, precio: number, banos: number, autos: number,
        dormitorios: number, transaccion: ETransaccion) {
        super(id, titulo, descripcion, precio);
        this.banos = banos;
        this.autos = autos;
        this.dormitorios = dormitorios;
        this.transaccion = transaccion;
    }

    get Banos(): number { return this.banos; };
    set Banos(e: number) { this.banos = e };

    get Autos(): number { return this.autos; };
    set Autos(e: number) { this.autos = e };

    get Dormitorios(): number { return this.dormitorios; };
    set Dormitorios(e: number) { this.dormitorios = e };

    get Transaccion(): ETransaccion { return this.transaccion; };
    set Transaccion(e: ETransaccion) { this.transaccion = e };
}

enum ETransaccion {
    Venta = "Venta",
    Alquiler = "Alquiler"
}