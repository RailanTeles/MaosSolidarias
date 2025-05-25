export class Campanha {
    id: number;
    nome: string;
    descricao: string;
    metaArrecadacao: number;
    valorAtual: number;
    tdInicio: Date;
    dtFim: Date;


    constructor(id: number, nome: string, descricao: string, metaArrecadacao: number, valorAtual: number, tdInicio: Date, dtFim: Date){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.metaArrecadacao = metaArrecadacao;
        this.valorAtual = valorAtual;
        this.tdInicio = tdInicio;
        this.dtFim = dtFim;
    }

}
