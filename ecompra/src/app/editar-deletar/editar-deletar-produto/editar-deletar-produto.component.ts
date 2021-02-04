import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { AlertsService } from 'src/app/service/alerts.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-editar-deletar-produto',
  templateUrl: './editar-deletar-produto.component.html',
  styleUrls: ['./editar-deletar-produto.component.css']
})
export class EditarDeletarProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  listaCategoria: Categoria[]
  categoriaProdutoNova: Categoria
  promo: string 
  promoFinal: boolean
  idCat: number

  codigoProduto: number
  nomeProduto: string
  precoProduto: number
  descricaoProduto: string
  quantidadeProduto: number
  promocaoProduto: boolean
  promocaoProdutoFinal: string
  categoriaProduto: string
  fotoProduto: string

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertsService
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    let codigo = this.route.snapshot.params['codigo']

    this.getProdutoById(codigo)

    this.getAllCategoria()
  }

  validaPromo(event: any){
    this.promo = event.target.value
    if(this.promo == "true"){
      this.promoFinal = true
    }else{
      this.promoFinal = false
    }
  }

  getAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp

    })
  }

  getProdutoById(id: number) {
    this.produtoService.getProdutoById(id).subscribe((resp: Produto) => {
      this.produto = resp

      this.codigoProduto = this.produto.codigo
      this.nomeProduto = this.produto.nome
      this.precoProduto = this.produto.preco
      this.descricaoProduto = this.produto.descricao
      this.quantidadeProduto = this.produto.quantidade
      this.promocaoProduto = this.produto.promocao

      if(this.promocaoProduto == true){
        this.promocaoProdutoFinal = "Sim"
      }else{
        this.promocaoProdutoFinal = "Não"
      }

      this.categoriaProduto = this.produto.categoria.descricao
      this.fotoProduto = this.produto.foto

    })
  }

  getCategoriaById(){
    this.categoriaService.getByIdCategoria(this.idCat).subscribe((resp: Categoria) => {
      this.categoriaProdutoNova = resp
    })
  }

  putProduto() {
    this.categoriaProdutoNova.codigo = this.idCat
    this.produto.categoria = this.categoriaProdutoNova
    
    this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      this.alertas.showAlertSuccess("Produto atualizado com sucesso!")
      this.router.navigate(["/admin"])
    })
  }

  deletarProduto(id: number) {
    this.produtoService.deleteProduto(id).subscribe(() => {
      this.alertas.showAlertSuccess('Produto deletado com sucesso!')
      this.router.navigate(["/admin"])
    })
  }
}
