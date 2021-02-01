import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';
import { environment } from './../../environments/environment.prod';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  entrar() {
    this.authService.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.codigo = this.usuarioLogin.codigo
      environment.nome = this.usuarioLogin.nome
      environment.token = this.usuarioLogin.token
                                // console.log(environment.codigo) testes
                                // console.log(environment.nome)   testes
      this.router.navigate(['/admin'])
    }, retornoErro => {
      if (retornoErro.status == 500) {
        alert('Usuário ou senha inválidos!')
      }
    })
  }

}
