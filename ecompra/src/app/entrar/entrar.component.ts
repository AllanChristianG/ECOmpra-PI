import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';
import { environment } from './../../environments/environment.prod';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  pagina: string = 'entrar'
  usuarioLogin: UsuarioLogin = new UsuarioLogin()
  cadastroLogado: string = environment.token

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas : AlertsService
  ) { }

  ngOnInit() {
    window.scroll(0, 0),
    environment.paginaAtual = this.pagina
  }

  entrar() {
    
    
    this.authService.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
    this.usuarioLogin = resp

      environment.codigo = this.usuarioLogin.codigo
      environment.nome = this.usuarioLogin.nome
      environment.token = this.usuarioLogin.token
      environment.tipoUsuario = this.usuarioLogin.tipoUsuario
      
      if(environment.tipoUsuario == 'administrador'){
        this.router.navigate(['/admin'])
        environment.paginaAtual = ''
      }else{
        this.router.navigate(['/home'])
        environment.paginaAtual = ''
      }
      
    }, retornoErro => {
      if (retornoErro.status == 500) {
        this.alertas.showAlertDanger('Usuário ou senha inválidos!')
      }


    })
  }
}
