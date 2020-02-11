import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { SegurancaRoutingModule } from './seguranca-routing.module';
import { PermissaoComponent } from './components/permissao/permissao.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaRoutingModule
  ],
  declarations: [PermissaoComponent, PerfilComponent]
})
export class SegurancaModule { }
