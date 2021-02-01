import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ContatoComponent } from './contato/contato.component';
import { EditarDeletarComponent } from './editar-deletar/editar-deletar/editar-deletar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { InicioPosLoginComponent } from './inicio-pos-login/inicio-pos-login.component';
import { MenuComponent } from './menu/menu.component';
import { SobrenosComponent } from './sobrenos/sobrenos.component';

const routes: Routes = [
  //Mandado o site iniciar na página Home 
  {path: '', redirectTo:'home', pathMatch: 'full'},
  //Outras rotas
  {path: 'home', component: HomeComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'entrar', component: EntrarComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'sobrenos', component: SobrenosComponent},
  {path: 'inicio-pos-login', component: InicioPosLoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'editar-deletar/:codigo', component: EditarDeletarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
