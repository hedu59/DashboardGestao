import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteiraAtivaComponent } from './carteira-ativa/carteira-ativa.component';

const routes: Routes = [  {
  path: 'carteira',
  component: CarteiraAtivaComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarteiraRoutingModule { }
