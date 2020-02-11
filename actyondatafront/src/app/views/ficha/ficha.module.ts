import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FichaRoutingModule } from './ficha-routing.module';
import { FichaCobrancaComponent } from './ficha-cobranca/ficha-cobranca.component';
import { DadosPessoaisComponent } from './components/dados-pessoais/dados-pessoais.component';
import { FoneFichaComponent } from './components/contato/fone-ficha/fone-ficha.component';
import { EnderecoFichaComponent } from './components/contato/endereco-ficha/endereco-ficha.component';
import { EmailFichaComponent } from './components/contato/email-ficha/email-ficha.component';
import { AcionamentoComponent } from './components/dados-ficha/acionamento/acionamento.component';
import { TituloComponent } from './components/dados-ficha/titulo/titulo.component';
import { BaixaComponent } from './components/dados-ficha/baixa/baixa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportPipeModule } from 'src/app/import-pipe/import-pipe.module';
import { DataTablesModule } from 'angular-datatables';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  imports: [
    CommonModule,
    FichaRoutingModule,
    NgbModule,
    FormsModule ,
    ReactiveFormsModule,
    ImportPipeModule,
    DataTablesModule,
    TextMaskModule
  ],
  declarations: [
    FichaCobrancaComponent,
    DadosPessoaisComponent,
    FoneFichaComponent,
    EnderecoFichaComponent,
    EmailFichaComponent,
    AcionamentoComponent,
    TituloComponent,
    BaixaComponent
  ]
})
export class FichaModule { }
