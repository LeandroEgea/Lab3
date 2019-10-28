function Anuncio(id, titulo, descripcion, tipo, precio, banos, dormitorios, cocheras) {
    this.id = id;
    this.titulo = titulo;
    this.transaccion = tipo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.num_wc = banos;
    this.num_estacionamiento = cocheras;
    this.num_dormitorio = dormitorios;
}