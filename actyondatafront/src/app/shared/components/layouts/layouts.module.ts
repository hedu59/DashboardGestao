import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { HeaderSidebarLargeComponent } from './admin-layout-sidebar-large/header-sidebar-large/header-sidebar-large.component';
import { AdminLayoutSidebarLargeComponent } from './admin-layout-sidebar-large/admin-layout-sidebar-large.component';
import { SidebarLargeComponent } from './admin-layout-sidebar-large/sidebar-large/sidebar-large.component';
import { SharedDirectivesModule } from '../../directives/shared-directives.module';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CustomizerComponent } from '../customizer/customizer.component';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';
import { FooterComponent } from '../footer/footer.component';
import { SearchModule } from '../search/search.module';


const components = [
  HeaderSidebarLargeComponent,
  SidebarLargeComponent,
  FooterComponent,
  CustomizerComponent,
  AdminLayoutSidebarLargeComponent,
  AuthLayoutComponent,
  BlankLayoutComponent,
];

@NgModule({
  imports: [
    NgbModule,
    RouterModule,
    FormsModule,
    SearchModule,
    SharedPipesModule,
    SharedDirectivesModule,
    PerfectScrollbarModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: components,
  exports: components
})
export class LayoutsModule { }
