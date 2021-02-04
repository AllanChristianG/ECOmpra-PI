import { AlertsService } from './../service/alerts.service';
import { AlertsComponent } from './../alerts/alerts.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
  private alertas : AlertsService
  ) { }

  ngOnInit() {
  }

  enviar(){
    this.alertas.showAlertSuccess('Mensagem enviada com sucesso!')
    
  }

}
