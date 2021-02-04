import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  imglog = environment.imglogo
  cadastro: boolean
  nomeUsuario: string


  constructor( 
    public authService: AuthService,
    private router: Router
   ) { }

  ngOnInit() {

  this.nomeUsuario = environment.nome 

  }

  administrador(){
    let aparecer: boolean = false

    if(environment.tipoUsuario == 'administrador'){
      aparecer = true
    }
    return aparecer
  }

  sair(){
    console.log(environment.codigo)
    console.log(environment.nome)
    console.log(environment.token)
    console.log(environment.tipoUsuario)
    
      environment.codigo = 0
      environment.nome = ''
      environment.token = ''
      environment.tipoUsuario = ''
      this.router.navigate(['/home'])
  }

}
