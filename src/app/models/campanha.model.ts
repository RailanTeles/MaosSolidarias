export class Campanha {
    id: number;
    nome: string;
    descricao: string;
    metaArrecadacao: number;
    valorAtual: number;
    dataInicio: Date;
    dataTermino: Date;


    constructor(id: number, nome: string, descricao: string, metaArrecadacao: number, valorAtual: number, dataInicio: Date, dataTermino: Date){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.metaArrecadacao = metaArrecadacao;
        this.valorAtual = valorAtual;
        this.dataInicio = dataInicio;
        this.dataTermino = dataTermino;
    }

}
