import { Categoria } from './../model/Categoria';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-pagina-produtos',
  templateUrl: './pagina-produtos.component.html',
  styleUrls: ['./pagina-produtos.component.css']
})
export class PaginaProdutosComponent implements OnInit {

  listaProdutos: Produto[]
  listaCatProd: Produto[]
  produto: Produto

  idCat: number

  idProduto: number
  nomeProduto: string
  precoProduto: number
  descricaoProduto: string
  quantidadeProduto: number
  promocaoProduto: boolean
  categoriaProduto: string
  fotoProduto: string

  listaCategorias: Categoria[]
  categoria: Categoria

  constructor(
    private produtosService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(){
    this.getAllProdutos()
    this.getAllCategoria()
  }

  getAllProdutos(){
    this.produtosService.getAllProduto().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
  }
  getProdutoById(id: number){
    this.produtosService.getProdutoById(id).subscribe((resp: Produto) => {
      this.produto = resp
      this.nomeProduto  = this.produto.nome
      this.idProduto = this.produto.codigo
      this.precoProduto = this.produto.preco
      this.descricaoProduto = this.produto.descricao
      this.quantidadeProduto = this.produto.quantidade
      this.fotoProduto = this.produto.foto
      this.promocaoProduto = this.produto.promocao     
    })
  }

  getAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategorias = resp
    })
  }

  findByIdCategoria(id:number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
      this.categoria = resp
      this.listaCatProd = this.categoria.produto
      console.log(this.listaCatProd)
    })
  }
}
