/// <reference path="bienraiz.ts" />

class Controller {
  // Alta de un elemento en el listado del local storage
  // Se toman los valores con JQuery de los elementos del DOM
  public static alta(bienes: Array<BienRaiz>): BienRaiz {
    let id: number = this.GenerateId(bienes);
    let titulo: string = String($("#txtTitulo").val());
    let descripcion: string = String($("#txtDescripcion").val());
    let precio: number = Number($("#numPrecio").val());
    let banos: number = Number($("#numBanos").val());
    let autos: number = Number($("#numAutos").val());
    let dormitorios: number = Number($("#numDormitorios").val());
    let transaccion: ETransaccion = this.obtenerTransaccion(String($("input[name='radioTransaccion']:checked").val()));

    let bien = new BienRaiz(id, titulo, descripcion, precio, banos, autos, dormitorios, transaccion);
    return bien;
  }

  // Baja fisica de un elemento del listado del local storage
  public static baja(bienes: Array<BienRaiz>): Array<BienRaiz> {
    let id: number = Number($("#idBienes").val());
    let index: number = this.GetIndex(id, bienes);

    if (index >= 0) {
      bienes.splice(index, 1);
    }
    return bienes;
  }

  // Modificacion de un elemento del listado del local storage
  public static modificar(bienes: Array<BienRaiz>): Array<BienRaiz> {
    let id: number = Number($("#idBienes").val());
    let titulo: string = String($("#txtTitulo").val());
    let descripcion: string = String($("#txtDescripcion").val());
    let precio: number = Number($("#numPrecio").val());
    let banos: number = Number($("#numBanos").val());
    let autos: number = Number($("#numAutos").val());
    let dormitorios: number = Number($("#numDormitorios").val());
    let transaccion: ETransaccion = this.obtenerTransaccion(String($("input[name='radioTransaccion']:checked").val()));
    let index: number = this.GetIndex(id, bienes);

    let bien = new BienRaiz(id, titulo, descripcion, precio, banos, autos, dormitorios, transaccion);

    bienes.splice(index, 1, bien);

    return bienes;
  }

  // Funcion para castear el string en valor del ENUM ETransaccion
  public static obtenerTransaccion(value: String): ETransaccion {
    if (value.toLowerCase() == "venta") {
      return ETransaccion.Venta;
    }
    else {
      return ETransaccion.Alquiler;
    }
  }

  // Busca el último ID de un objeto del listado y retorna el siguiente
  private static GenerateId(listado: Array<BienRaiz>): number {
    var IDMasAlto: number;

    if (listado) {
      IDMasAlto = listado.reduce(function (IDMasAlto, elemento) {
        if (elemento.Id > IDMasAlto) {
          IDMasAlto = elemento.Id;
        };
        return IDMasAlto;
      }, 0);
      return IDMasAlto + 1;
    }
    return 0;
  }

  private static GetIndex(id: number, listado: Array<BienRaiz>): number {
    let index: number = -1;

    if (listado && id) {
      for (var i = 0; i < listado.length; i++) {
        if (listado[i].Id == id) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
}
