import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DistribuicaoFaixaComponent } from './distribuicao-faixa/distribuicao-faixa.component';
import { DistribuicaoUFComponent } from './distribuicao-uf/distribuicao-uf.component';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    DashboardRoutingModule
  ],
  declarations: [DashboadDefaultComponent, DistribuicaoFaixaComponent, DistribuicaoUFComponent]
})
export class DashboardModule { }
