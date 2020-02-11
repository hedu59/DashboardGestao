import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgProgressModule } from '@ngx-progressbar/core';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { ClienteRoutingModule } from './cliente-routing.module';
import { PesquisaClienteComponent } from './pesquisa-cliente/pesquisa-cliente.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { FormWizardModule } from 'src/app/shared/components/form-wizard/form-wizard.module';
import { FoneComponent } from './fone/fone.component';
import { EmailComponent } from './email/email.component';
import { AvalistaComponent } from './avalista/avalista.component';
import { TitulosComponent } from './titulos/titulos.component';
import { TextMaskModule } from 'angular2-text-mask';
import { DadosProfissionaisComponent } from './dados-profissionais/dados-profissionais.component';
import { ConvertCpfPipe } from 'src/app/shared/pipes/convert-cpf.pipe';
import { ConvertDataBrPipe } from 'src/app/shared/pipes/convert-data-br.pipe';
import { ImportPipeModule } from 'src/app/import-pipe/import-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    FormWizardModule,
    NgbModule,
    DataTablesModule,
    TextMaskModule,
    NgProgressModule,
    CurrencyMaskModule,
    ImportPipeModule
  ],
  declarations: [
    PesquisaClienteComponent,
    CadastrarComponent,
    FoneComponent,
    EmailComponent,
    AvalistaComponent,
    TitulosComponent,
    ConvertCpfPipe,
    // ConvertDataBrPipe,
    DadosProfissionaisComponent
  ]
})
export class ClienteModule { }
