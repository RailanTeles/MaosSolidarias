export class Usuario {
    id: number;
    cpf: number;
    nome: string;
    email: string;
    telefone: number;
    senha: string;
    tipo: "admin" | "doador";
    senhaPadrao: boolean;

    constructor(id: number, cpf: number, nome: string, email: string, telefone: number, senha: string,  tipo: "admin" | "doador", senhaPadrao: boolean){
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.tipo = tipo;
        this.senhaPadrao = senhaPadrao;
    }

}
