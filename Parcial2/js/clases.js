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
var Anuncio = /** @class */ (function () {
    function Anuncio(id, titulo, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    Object.defineProperty(Anuncio.prototype, "Id", {
        // Setters & Getters
        get: function () { return this.id; },
        set: function (e) { this.id = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Anuncio.prototype, "Titulo", {
        get: function () { return this.titulo; },
        set: function (e) { this.titulo = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Anuncio.prototype, "Descripcion", {
        get: function () { return this.descripcion; },
        set: function (e) { this.descripcion = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Anuncio.prototype, "Precio", {
        get: function () { return this.precio; },
        set: function (e) { this.precio = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Anuncio;
}());
/// <reference path="anuncio.ts" />
var BienRaiz = /** @class */ (function (_super) {
    __extends(BienRaiz, _super);
    function BienRaiz(id, titulo, descripcion, precio, banos, autos, dormitorios, transaccion) {
        var _this = _super.call(this, id, titulo, descripcion, precio) || this;
        _this.banos = banos;
        _this.autos = autos;
        _this.dormitorios = dormitorios;
        _this.transaccion = transaccion;
        return _this;
    }
    Object.defineProperty(BienRaiz.prototype, "Banos", {
        get: function () { return this.banos; },
        set: function (e) { this.banos = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(BienRaiz.prototype, "Autos", {
        get: function () { return this.autos; },
        set: function (e) { this.autos = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(BienRaiz.prototype, "Dormitorios", {
        get: function () { return this.dormitorios; },
        set: function (e) { this.dormitorios = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(BienRaiz.prototype, "Transaccion", {
        get: function () { return this.transaccion; },
        set: function (e) { this.transaccion = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return BienRaiz;
}(Anuncio));
var ETransaccion;
(function (ETransaccion) {
    ETransaccion["Venta"] = "Venta";
    ETransaccion["Alquiler"] = "Alquiler";
})(ETransaccion || (ETransaccion = {}));
var Calculos = /** @class */ (function () {
    function Calculos() {
    }
    Calculos.calcularPrecioPromedio = function (bienes) {
        var promedio;
        var precios = bienes.map(function (obj) { return obj.Precio; });
        if (precios.length > 0) {
            promedio = precios.reduce(function (prev, curr) { return (prev + curr); }) / precios.length;
        }
        else {
            promedio = 0;
        }
        return promedio;
    };
    return Calculos;
}());
/// <reference path="bienraiz.ts" />
var Controller = /** @class */ (function () {
    function Controller() {
    }
    // Alta de un elemento en el listado del local storage
    // Se toman los valores con JQuery de los elementos del DOM
    Controller.alta = function (bienes) {
        var id = this.GenerateId(bienes);
        var titulo = String($("#txtTitulo").val());
        var descripcion = String($("#txtDescripcion").val());
        var precio = Number($("#numPrecio").val());
        var banos = Number($("#numBanos").val());
        var autos = Number($("#numAutos").val());
        var dormitorios = Number($("#numDormitorios").val());
        var transaccion = this.obtenerTransaccion(String($("input[name='radioTransaccion']:checked").val()));
        var bien = new BienRaiz(id, titulo, descripcion, precio, banos, autos, dormitorios, transaccion);
        return bien;
    };
    // Baja fisica de un elemento del listado del local storage
    Controller.baja = function (bienes) {
        var id = Number($("#idBienes").val());
        var index = this.GetIndex(id, bienes);
        if (index >= 0) {
            bienes.splice(index, 1);
        }
        return bienes;
    };
    // Modificacion de un elemento del listado del local storage
    Controller.modificar = function (bienes) {
        var id = Number($("#idBienes").val());
        var titulo = String($("#txtTitulo").val());
        var descripcion = String($("#txtDescripcion").val());
        var precio = Number($("#numPrecio").val());
        var banos = Number($("#numBanos").val());
        var autos = Number($("#numAutos").val());
        var dormitorios = Number($("#numDormitorios").val());
        var transaccion = this.obtenerTransaccion(String($("input[name='radioTransaccion']:checked").val()));
        var index = this.GetIndex(id, bienes);
        var bien = new BienRaiz(id, titulo, descripcion, precio, banos, autos, dormitorios, transaccion);
        bienes.splice(index, 1, bien);
        return bienes;
    };
    // Funcion para castear el string en valor del ENUM ETransaccion
    Controller.obtenerTransaccion = function (value) {
        if (value.toLowerCase() == "venta") {
            return ETransaccion.Venta;
        }
        else {
            return ETransaccion.Alquiler;
        }
    };
    // Busca el último ID de un objeto del listado y retorna el siguiente
    Controller.GenerateId = function (listado) {
        var IDMasAlto;
        if (listado) {
            IDMasAlto = listado.reduce(function (IDMasAlto, elemento) {
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