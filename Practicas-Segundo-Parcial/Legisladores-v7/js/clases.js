"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Persona = /** @class */ (function () {
    function Persona(id, nombre, apellido, edad, email, sexo) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.sexo = sexo;
    }
    Object.defineProperty(Persona.prototype, "Nombre", {
        // Setters & Getters
        get: function () { return this.nombre; },
        set: function (e) { this.nombre = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Persona.prototype, "Apellido", {
        get: function () { return this.apellido; },
        set: function (e) { this.apellido = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Persona.prototype, "Edad", {
        get: function () { return this.edad; },
        set: function (e) { this.edad = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Persona.prototype, "Email", {
        get: function () { return this.email; },
        set: function (e) { this.email = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Persona.prototype, "Sexo", {
        get: function () { return this.sexo; },
        set: function (e) { this.sexo = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Persona.prototype, "Id", {
        get: function () { return this.id; },
        set: function (e) { this.id = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Persona;
}());
/// <reference path="persona.ts" />
var Legislador = /** @class */ (function (_super) {
    __extends(Legislador, _super);
    function Legislador(id, nombre, apellido, edad, email, sexo, tipo) {
        var _this = _super.call(this, id, nombre, apellido, edad, email, sexo) || this;
        _this.tipo = tipo;
        return _this;
    }
    Object.defineProperty(Legislador.prototype, "TipoLegislador", {
        get: function () { return this.tipo; },
        set: function (e) { this.tipo = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Legislador;
}(Persona));
var tipoLegislador;
(function (tipoLegislador) {
    tipoLegislador["Diputado"] = "Diputado";
    tipoLegislador["Senador"] = "Senador";
})(tipoLegislador || (tipoLegislador = {}));
/// <reference path="legislador.ts" />
var Controller = /** @class */ (function () {
    function Controller() {
    }
    // Alta de un elemento en el listado del local storage
    // Se toman los valores con JQuery de los elementos del DOM
    Controller.alta = function (legisladores) {
        var id = this.GenerateId(legisladores);
        var nombre = String($("#txtNombre").val());
        var apellido = String($("#txtApellido").val());
        var edad = Number($("#numEdad").val());
        var email = String($("#txtEmail").val());
        var sexo = (String($("input[name='radioSexo']:checked").val()));
        var tipo = this.tipoLegislador(String($("input[name='radioTipo']:checked").val()));
        var legislador = new Legislador(id, nombre, apellido, edad, email, sexo, tipo);
        return legislador;
    };
    // Baja fisica de un elemento del listado del local storage
    Controller.baja = function (legisladores) {
        var id = Number($("#idLegislador").val());
        var index = this.GetIndex(id, legisladores);
        if (index >= 0) {
            // Borro el elemento del indice especificado
            legisladores.splice(index, 1);
        }
        else {
            console.log("No se encuentra el legislador");
        }
        return legisladores;
    };
    // Modificacion de un elemento del listado del local storage
    Controller.modificar = function (legisladores) {
        var id = Number($("#idLegislador").val());
        var nombre = String($("#txtNombre").val());
        var apellido = String($("#txtApellido").val());
        var edad = Number($("#numEdad").val());
        var email = String($("#txtEmail").val());
        var sexo = (String($("input[name='radioSexo']:checked").val()));
        var tipo = this.tipoLegislador(String($("input[name='radioTipo']:checked").val()));
        var index = this.GetIndex(id, legisladores);
        var legislador = new Legislador(id, nombre, apellido, edad, email, sexo, tipo);
        legisladores.splice(index, 1, legislador);
        return legisladores;
    };
    // Funcion para castear el string en valor del ENUM tipoLegislador
    Controller.tipoLegislador = function (value) {
        if (value.toLowerCase() == "diputado") {
            return tipoLegislador.Diputado;
        }
        else {
            return tipoLegislador.Senador;
        }
    };
    // Busca el último ID de un objeto del listado y retorna el siguiente
    Controller.GenerateId = function (listado) {
        var IDMasAlto;
        if (listado) {
            IDMasAlto = listado.reduce(function (IDMasAlto, elemento, i, array) {
                if (elemento.Id > IDMasAlto) {
                    IDMasAlto = elemento.Id;
                }
                ;
                return IDMasAlto;
            }, 0);
            return IDMasAlto + 1;
        }
        return 0;
    };
    Controller.GetIndex = function (id, listado) {
        var index = -1;
        if (listado && id) {
            for (var i = 0; i < listado.length; i++) {
                if (listado[i].Id == id) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    return Controller;
}());
//# sourceMappingURL=clases.js.map