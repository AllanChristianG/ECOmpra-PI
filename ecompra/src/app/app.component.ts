import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { EntrarComponent } from './entrar/entrar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(
    
  ){ }

  title = 'ecompra';

  ngOnInit() {
    this.aparecer()
  }

  aparecer(){
    let aparecer: boolean = false
  
    if(environment.paginaAtual != 'entrar' && environment.paginaAtual != 'cadastro' && environment.paginaAtual != 'sacola'){
      aparecer = true
    }
    return aparecer
  }

}
