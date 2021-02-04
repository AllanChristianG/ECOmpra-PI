import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { AlertsService } from '../service/alerts.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-sacola-compra',
  templateUrl: './sacola-compra.component.html',
  styleUrls: ['./sacola-compra.component.css']
})
export class SacolaCompraComponent implements OnInit {
  
  imgLogo = environment.imglogo

  pagina: string = 'sacola'
  codigo: number
  quantidade: number = 1

  produto: Produto = new Produto()
  validaPagamento: string


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private alertas: AlertsService

  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.alertas.showAlertInfo('Você precisa estar logado para acessar essa página!')
      this.router.navigate(["/entrar"])
    }
    environment.paginaAtual = this.pagina

    this.codigo = this.route.snapshot.params['codigo']

    this.getProdutoById(this.codigo)

  }

  getProdutoById(id: number){
    this.produtoService.getProdutoById(id).subscribe((resp: Produto) => {
      this.produto = resp

    })
  }

  acrescentar(){
    this.quantidade += 1
  }

  retirar(){
    if(this.quantidade == 1){
      this.alertas.showAlertDanger('Não é possível zerar o carrinho!')
    }else{
      this.quantidade -= 1
    }
  }

  voltar(){
    this.router.navigate(["/pagina-produtos"])
    environment.paginaAtual = ''
  }

  validarPagamento(pagamento: string){
    console.log(pagamento)
  }

  comprar(){
    this.router.navigate(["/home"])

  }

  finalizarVenda(){

    if(this.validaPagamento == "cartao"){
      this.alertas.showAlertInfo("Dados enviados para processamento! Em breve você reberá um email ;)")
      this.router.navigate(['/home'])
      environment.paginaAtual = ''
    }else if(this.validaPagamento == "boleto"){
      this.alertas.showAlertInfo("Em breve você reberá o boleto no seu um email!")
      this.router.navigate(['/home'])
      environment.paginaAtual = ''
    }else{
      this.alertas.showAlertDanger("Selecione uma opção de pagamento!")
    }

  }

}
