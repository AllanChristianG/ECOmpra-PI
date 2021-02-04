import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { AlertsService } from 'src/app/service/alerts.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-editar-deletar',
  templateUrl: './editar-deletar.component.html',
  styleUrls: ['./editar-deletar.component.css']
})
export class EditarDeletarComponent implements OnInit {

  
  categoria: Categoria = new Categoria
  codigoCategoria: number
  codigoCategoriaDeletar: number
  nomeAntigo: string
  descricaoAntiga: string
  setorAntigo: string
  
  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertsService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let codigo = this.route.snapshot.params['codigo']
    this.findByIdCategoria(codigo)

    this.codigoCategoria = this.route.snapshot.params['codigo']
    this.findByIdCategoria(this.codigoCategoria)
  }

  findByIdCategoria(codigo: number){
    this.categoriaService.getByIdCategoria(codigo).subscribe((resp: Categoria) =>{
    this.categoria = resp 

    this.codigoCategoriaDeletar = this.categoria.codigo
    this.nomeAntigo = this.categoria.nome
    this.descricaoAntiga = this.categoria.descricao
    this.setorAntigo = this.categoria.setor
    })
  }

  atualizar(){
    this.categoriaService.putCategoria(this.categoria).subscribe((resp: Categoria) =>{
      this.categoria = resp
      this.alertas.showAlertSuccess('Tema atualizado com sucesso!')
      this.router.navigate(['/admin'])
    })
  }

  apagar(id: number){
    this.categoriaService.deleteCategoria(id).subscribe(()=>{
      this.alertas.showAlertSuccess('Categoria apagada com sucesso!')
      this.router.navigate(['/admin'])
    })
  }

  limpar(){
    this.alertas.showAlertInfo
    ('Limpeza realizada com sucesso!')

  }
}
