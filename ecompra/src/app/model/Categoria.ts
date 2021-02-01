import { Produto } from "./Produto"

export class Categoria{
    public codigo: number
    public nome: string
    public descricao: string
    public setor: string
    public produto: Produto[]
}