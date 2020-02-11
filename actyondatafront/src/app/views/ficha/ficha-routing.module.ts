import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichaCobrancaComponent } from './ficha-cobranca/ficha-cobranca.component';

const routes: Routes = [
  {
    path: 'fichaCobranca', component: FichaCobrancaComponent
  },
  {
    path: 'fichaCobranca/:id/:cont_id', component: FichaCobrancaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaRoutingModule { }
