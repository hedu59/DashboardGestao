import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { DistribuicaoFaixaComponent } from './distribuicao-faixa/distribuicao-faixa.component';
import { DistribuicaoUFComponent } from './distribuicao-uf/distribuicao-uf.component';

const routes: Routes = [
  {
    path: 'v1',
    component: DashboadDefaultComponent
  },
  {
    path: 'faixa',
    component: DistribuicaoFaixaComponent
  },
  {
    path: 'uf',
    component: DistribuicaoUFComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
