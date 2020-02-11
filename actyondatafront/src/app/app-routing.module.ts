import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGaurd } from './shared/services/auth.gaurd';
import { AdminLayoutSidebarLargeComponent } from './shared/components/layouts/admin-layout-sidebar-large/admin-layout-sidebar-large.component';

const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './views/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'carteira',
    loadChildren: './views/carteira/carteira.module#CarteiraModule'
  },
  {
    path: 'producao',
    loadChildren: './views/produtividade/produtividade.module#ProdutividadeModule'
  },
  {
    path: 'icons',
    loadChildren: './views/icons/icons.module#IconsModule'
  },
  {
    path: 'cliente',
    loadChildren: './views/cliente/cliente.module#ClienteModule'
  },
  {
    path: 'ficha',
    loadChildren: './views/ficha/ficha.module#FichaModule'
  },
  {
    path: 'seguranca',
    loadChildren: './views/seguranca/seguranca.module#SegurancaModule'
  }
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/v1',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule'
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [AuthGaurd],
    loadChildren: './views/sessions/sessions.module#SessionsModule'
  },
  {
    path: '',
    component: AdminLayoutSidebarLargeComponent,
    canActivate: [AuthGaurd],
    children: adminRoutes
  },
  {
    path: '**',
    redirectTo: 'others/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
