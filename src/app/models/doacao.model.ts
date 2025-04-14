export class Doacao {
    id: number;
    valor: number;
    idDoador: number;
    idCampanha: number;

    constructor(id: number, valor: number, idDoador: number, idCampanha: number){
        this.id = id;
        this.valor = valor;
        this.idDoador = idDoador;
        this.idCampanha = idCampanha;
    }
}
