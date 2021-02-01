import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio-pos-login',
  templateUrl: './inicio-pos-login.component.html',
  styleUrls: ['./inicio-pos-login.component.css']
})
export class InicioPosLoginComponent implements OnInit {

  nomeDoUsuario = environment.nome
  
  constructor() { }

  ngOnInit() {
  }

}
