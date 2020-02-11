import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutividadeRoutingModule } from './produtividade-routing.module';
import { ProducaoComponent } from './producao/producao.component';

@NgModule({
  imports: [
    CommonModule,
    ProdutividadeRoutingModule
  ],
  declarations: [ProducaoComponent]
})
export class ProdutividadeModule { }
