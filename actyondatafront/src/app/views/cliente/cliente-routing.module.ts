import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisaClienteComponent } from './pesquisa-cliente/pesquisa-cliente.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';

const routes: Routes = [
  {
    path: 'pesquisaCliente', component: PesquisaClienteComponent,
  },
  {
    path: 'cadastrarCliente', component: CadastrarComponent
  },
  {
    path: 'editar/:id', component: CadastrarComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
