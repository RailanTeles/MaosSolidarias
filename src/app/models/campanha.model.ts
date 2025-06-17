export class Campanha {
    id?: number;
    nome: string;
    descricao: string;
    metaArrecadacao: number;
    valorArrecadado: number;
    dtInicio: Date;
    dtFim: Date;


    constructor( nome: string, descricao: string, metaArrecadacao: number, valorArrecadado: number, dtInicio: Date, dtFim: Date){
        this.nome = nome;
        this.descricao = descricao;
        this.metaArrecadacao = metaArrecadacao;
        this.valorArrecadado = valorArrecadado;
        this.dtInicio = dtInicio;
        this.dtFim = dtFim;
    }

}
