import { CategoriaService } from './../service/categoria.service';
import { Router } from '@angular/router';

import { Categoria } from './../model/Categoria';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]
  constructor (
    private router: Router,
    private categriaService: CategoriaService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.findAllCadastrar()
  }


  findAllCadastrar(){
    this.categriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  cadastrar(){
    this.categriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=> {
      this.categoria = resp 
      alert('Categoria Cadastrada com sucesso!')
      this.findAllCadastrar()
      this.categoria = new Categoria()
    })
  }

}