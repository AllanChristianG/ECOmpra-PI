import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('http://localHost:8080/usuario/logar', usuarioLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('http://localHost:8080/usuario/cadastrar', usuario)
  }

  logado(){
    let logadin: boolean = false

    if(environment.token != ''){
      logadin = true
    }
    return logadin
  }
  
  administrador(){
    let adm: boolean = false

    if(environment.tipoUsuario == "adm"){
      adm = true
    }

    return adm
  }
}