export class Doacao {
    codigoSegurancaCartao: number;
    dtValidadeCartao: Date;
    nomeCartao: string;
    numeroCartao: string;
    id: number;
    valorDoado: number;
    idDoador: number;
    idCampanha: number;

    constructor(codigoSegurancaCartao: number, dtValidadeCartao: Date, nomeCartao: string, numeroCartao: string ,id: number, valorDoado: number, idDoador: number, idCampanha: number){
        this.codigoSegurancaCartao = codigoSegurancaCartao;
        this.dtValidadeCartao = dtValidadeCartao;
        this.nomeCartao = nomeCartao;
        this.numeroCartao = numeroCartao;
        this.id = id;
        this.valorDoado = valorDoado;
        this.idDoador = idDoador;
        this.idCampanha = idCampanha;
    }
}
