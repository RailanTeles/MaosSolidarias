export class Doacao {
    codigoSegurancaCartao: number;
    dtValidadeCartao: Date;
    nomeCartao: string;
    numeroCartao: string;
    id: number;
    valorDoado: number;
    idDoador: number;
    idCampanha: number;
    dataHora: Date;

    constructor(codigoSegurancaCartao: number, dtValidadeCartao: Date, nomeCartao: string, numeroCartao: string ,id: number, valorDoado: number, idDoador: number, idCampanha: number, dataHora: Date){
        this.codigoSegurancaCartao = codigoSegurancaCartao;
        this.dtValidadeCartao = dtValidadeCartao;
        this.nomeCartao = nomeCartao;
        this.numeroCartao = numeroCartao;
        this.id = id;
        this.valorDoado = valorDoado;
        this.idDoador = idDoador;
        this.idCampanha = idCampanha;
        this.dataHora = dataHora;
    }
}
