import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/Produto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listPromo: Produto[]
  produto: Produto

  idProduto: number
  nomeProduto: string
  descricaoProduto: string
  precoProduto: number
  quantidadeProduto: number
  promocaoProduto: boolean
  categoriaProduto: string
  fotoProduto: string 

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(){
    this.promo()
  }

  promo(){
    this.produtoService.getProdutoPromocao().subscribe((resp : Produto[])=>{
      this.listPromo = resp
    })
  }

  getProdutoById(id: number){
    return this.produtoService.getProdutoById(id).subscribe((resp: Produto) => {
      this.produto = resp

      this.idProduto = this.produto.codigo
      this.nomeProduto = this.produto.nome
      this.descricaoProduto = this.produto.descricao
      this.precoProduto = this.produto.preco
      this.quantidadeProduto = this.produto.quantidade
      this.promocaoProduto = this.produto.promocao
      this.categoriaProduto = this.produto.categoria.descricao
      this.fotoProduto = this.produto.foto

    })
  }

}