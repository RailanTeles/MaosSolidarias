export class Doacao {
    id: number;
    valor: number;
    idDoador: number;
    idCampanha: number;
    dataHora: Date;

    constructor(id: number, valor: number, idDoador: number, idCampanha: number, dataHora: Date){
        this.id = id;
        this.valor = valor;
        this.idDoador = idDoador;
        this.idCampanha = idCampanha;
        this.dataHora = dataHora;
    }
}
