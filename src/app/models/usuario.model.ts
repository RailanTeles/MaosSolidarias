export class Usuario {
    id: number;
    cpf: number;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    tipo: "ADMIN" | "DOADOR";
    primeiroAcesso: boolean;

    constructor(id: number, cpf: number, nome: string, email: string, telefone: string, senha: string,  tipo: "ADMIN" | "DOADOR", primeiroAcesso: boolean){
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.tipo = tipo;
        this.primeiroAcesso = primeiroAcesso;
    }

}
