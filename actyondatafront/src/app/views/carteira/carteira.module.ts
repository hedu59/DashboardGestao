import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarteiraRoutingModule } from './carteira-routing.module';
import { CarteiraAtivaComponent } from './carteira-ativa/carteira-ativa.component';

@NgModule({
  imports: [
    CommonModule,
    CarteiraRoutingModule
  ],
  declarations: [CarteiraAtivaComponent]
})
export class CarteiraModule { }
