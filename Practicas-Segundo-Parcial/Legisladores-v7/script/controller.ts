/// <reference path="legislador.ts" />

class Controller {
  // Alta de un elemento en el listado del local storage
  // Se toman los valores con JQuery de los elementos del DOM
  public static alta(legisladores: Array<Legislador>): Legislador {
    let id: number = this.GenerateId(legisladores);
    let nombre: string = String($("#txtNombre").val());
    let apellido: string = String($("#txtApellido").val());
    let edad: number = Number($("#numEdad").val());
    let email: string = String($("#txtEmail").val());
    let sexo: string = (String($("input[name='radioSexo']:checked").val()));
    let tipo: tipoLegislador = this.tipoLegislador(String($("input[name='radioTipo']:checked").val()));

    let legislador = new Legislador(id, nombre, apellido, edad, email, sexo, tipo);
    return legislador;
  }

  // Baja fisica de un elemento del listado del local storage
  public static baja(legisladores: Array<Legislador>): Array<Legislador> {
    let id: number = Number($("#idLegislador").val());
    let index: number = this.GetIndex(id, legisladores);

    if (index >= 0) {
      // Borro el elemento del indice especificado
      legisladores.splice(index, 1);
    }
    else {
      console.log("No se encuentra el legislador");
    }
    return legisladores;
  }

  // Modificacion de un elemento del listado del local storage
  public static modificar(legisladores: Array<Legislador>): Array<Legislador> {

    let id: number = Number($("#idLegislador").val());
    let nombre: string = String($("#txtNombre").val());
    let apellido: string = String($("#txtApellido").val());
    let edad: number = Number($("#numEdad").val());
    let email: string = String($("#txtEmail").val());
    let sexo: string = (String($("input[name='radioSexo']:checked").val()));
    let tipo: tipoLegislador = this.tipoLegislador(String($("input[name='radioTipo']:checked").val()));
    let index: number = this.GetIndex(id, legisladores);

    let legislador = new Legislador(id, nombre, apellido, edad, email, sexo, tipo);

    legisladores.splice(index, 1, legislador);

    return legisladores;
  }


  // Funcion para castear el string en valor del ENUM tipoLegislador
  public static tipoLegislador(value: String): tipoLegislador {
    if (value.toLowerCase() == "diputado") {
      return tipoLegislador.Diputado;
    }
    else {
      return tipoLegislador.Senador;
    }
  }
  // Busca el último ID de un objeto del listado y retorna el siguiente
  private static GenerateId(listado: Array<Legislador>): number {
    var IDMasAlto: number;

    if (listado) {
      IDMasAlto = listado.reduce(function (IDMasAlto, elemento, i, array) {
        if (elemento.Id > IDMasAlto) {
          IDMasAlto = elemento.Id;
        };
        return IDMasAlto;
      }, 0);
      return IDMasAlto + 1;
    }
    return 0;
  }

  private static GetIndex(id: number, listado: Array<Legislador>): number {
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

  /*// Retorna un elemento de un listado de objetos por el Id
private static GetById(id:number, listado:Array<Legislador>): Legislador
{
  let objeto:Legislador[] = listado;
  if(listado)
  {
    objeto = listado.filter(elemento => elemento.Id == id);
  }
  return objeto[0];
}*/
}
