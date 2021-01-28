import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    
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
    this.usuario.tipo = this.tipoUsuario //OK
    this.usuario.nome = this.nomeUsuarioReal //OK
    this.usuario.usuario = this.usuarioFormulario //OK

    if(this.usuario.senha != this.confirmandoSenha){
      alert('As senhas não conferem!')
    }else if(this.usuario.senha.length <= 5){
      alert('Sua senha deve ter mais que 5 caracteres!')
    }
    else if(this.usuario.nome.length <= 2){
      alert('Insira um nome maior que 2 caracteres')
    }else if(this.usuario.usuario.length <= 4){
      alert('Insira um usuário maior que 4 caracteres')
    }else if(this.usuario.tipo === null || this.usuario.tipo === undefined){
      alert('Escolha um tipo de usuário!')
    }else{
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        alert('Cadastro realizado com sucesso!')
      })
    }
  }
}