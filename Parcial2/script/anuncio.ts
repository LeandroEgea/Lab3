class Anuncio {
    protected id: number;
    private titulo: string;
    private descripcion: string;
    private precio: number;

    constructor(id: number, titulo: string, descripcion: string, precio: number) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    // Setters & Getters
    get Id(): number { return this.id; };
    set Id(e: number) { this.id = e };

    get Titulo(): string { return this.titulo; };
    set Titulo(e: string) { this.titulo = e };

    get Descripcion(): string { return this.descripcion; };
    set Descripcion(e: string) { this.descripcion = e };

    get Precio(): number { return this.precio; };
    set Precio(e: number) { this.precio = e };
}



