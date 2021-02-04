import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { SobrenosComponent } from './sobrenos/sobrenos.component';
import { ContatoComponent } from './contato/contato.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { AdminComponent } from './admin/admin.component';
import { EditarDeletarComponent } from './editar-deletar/editar-deletar/editar-deletar.component';
import { PaginaProdutosComponent } from './pagina-produtos/pagina-produtos.component';
import { EditarDeletarProdutoComponent } from './editar-deletar/editar-deletar-produto/editar-deletar-produto.component';

import { ApoiadoresParceirosComponent } from './apoiadores-parceiros/apoiadores-parceiros.component';
import { SacolaCompraComponent } from './sacola-compra/sacola-compra.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    SobrenosComponent,
    ContatoComponent,
    EntrarComponent,
    CadastrarComponent,
    AdminComponent,
    EditarDeletarComponent,
    PaginaProdutosComponent,
    EditarDeletarProdutoComponent,

    ApoiadoresParceirosComponent,

    SacolaCompraComponent,

    AlertsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
