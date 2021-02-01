import { Categoria } from "./Categoria"

export class Produto{
    public codigo: number
    public nome: string
    public preco: number
    public descricao: string
    public quantidade: number
    public promocao: boolean
    public categoria: Categoria
}