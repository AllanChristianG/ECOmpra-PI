import { CategoriaService } from './../service/categoria.service';
import { Router } from '@angular/router';

import { Categoria } from './../model/Categoria';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';
import { AlertsService } from '../service/alerts.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  produto: Produto = new Produto
  
  listProdutos: Produto[]

  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]

  promo: string
  promoExibe: string
  promoFinal: boolean
  idCat: number
  categoriaProduto: Categoria

  constructor (
    private router: Router,
    private categriaService: CategoriaService,
    private produtoService: ProdutoService,
    private alertas : AlertsService

  ) {}

  ngOnInit() {
    environment.paginaAtual = "admin"

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.findAllCadastrar()
    this.findAllProdutos()
  }

  validaPromo(event: any){
    this.promo = event.target.value
    if(this.promo == "true"){
      this.promoFinal = true
    }else{
      this.promoFinal = false
    }
  }

  findAllCadastrar(){
    this.categriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  findByIdCategoria(){
    this.categriaService.getByIdCategoria(this.idCat).subscribe((resp: Categoria) => {
      this.categoriaProduto = resp
    })
  }

  cadastrar(){
    this.categriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=> {
      this.categoria = resp 
      this.alertas.showAlertSuccess('Categoria Cadastrada com sucesso!')
      this.findAllCadastrar()
      this.categoria = new Categoria()
    })
  }

  findAllProdutos(){
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listProdutos = resp
    })
  }

  cadastrarProduto(){    
    this.categoriaProduto.codigo = this.idCat
    
    this.produto.categoria = this.categoriaProduto
    this.produto.promocao = this.promoFinal
    
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      this.alertas.showAlertSuccess("Produto cadastrado com sucesso!")
      this.findAllProdutos()
      this.produto = new Produto()

    })
  }

}