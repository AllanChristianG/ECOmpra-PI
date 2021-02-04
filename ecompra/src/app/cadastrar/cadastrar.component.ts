import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  
  usuario: Usuario = new Usuario
  confirmandoSenha: string //OK
  tipoUsuario: string //OK
  nomeUsuarioReal: string
  usuarioFormulario: string //OK

  public admin: boolean = true

  constructor(
    public authService: AuthService,
    private router: Router,
    private alertas : AlertsService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.paginaAtual != "admin"){
      environment.paginaAtual = 'cadastro'
    } 

  }

  confirmarSenha(event: any){
    this.confirmandoSenha = event.target.value //OK
  }

  tipoUsuarioMetodo(event: any){
    this.tipoUsuario = event.target.value //OK
  }

  validandoNomeUsuario(event: any){
    this.usuarioFormulario = event.target.value //OK
  }

  validandoNomeReal(event: any){
    this.nomeUsuarioReal = event.target.value //OK
  }
  
  cadastrar(){
    if(environment.tipoUsuario == 'administrador'){
      this.usuario.tipoUsuario = this.tipoUsuario
    }else{
      this.usuario.tipoUsuario = "normal" //OK
    }

    this.usuario.nome = this.nomeUsuarioReal //OK
    this.usuario.usuario = this.usuarioFormulario //OK

    if(this.usuario.senha != this.confirmandoSenha){
      this.alertas.showAlertDanger('As senhas não conferem!')
    }else if(this.usuario.senha.length <= 5){
      this.alertas.showAlertDanger('Sua senha deve ter mais que 5 caracteres!')
    }
    else if(this.usuario.nome.length <= 2){
      this.alertas.showAlertDanger('Insira um nome maior que 2 caracteres')
    }else if(this.usuario.usuario.length <= 4){
      this.alertas.showAlertDanger('Insira um usuário maior que 4 caracteres')
    }else if(this.usuario.tipoUsuario === null || this.usuario.tipoUsuario === undefined){
      this.alertas.showAlertDanger('Escolha um tipo de usuário!')
    }else{
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp

        
        if(environment.paginaAtual == "admin"){
          this.alertas.showAlertSuccess('Cadastro realizado com sucesso!')
          this.usuario = new Usuario()
          this.confirmandoSenha = ''
        }else{
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Cadastro realizado com sucesso!')
        }
        
        environment.paginaAtual = ''
        
      })
    }
  }
}