import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProducaoComponent } from './producao/producao.component';

const routes: Routes = [
  {
    path: 'producao',
    component: ProducaoComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutividadeRoutingModule { }
