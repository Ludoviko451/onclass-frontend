import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LibraryComponent } from './components/pages/library/library.component';
import { TechnologyComponent } from './components/pages/technology/technology.component';
import { CapacityComponent } from './components/pages/capacity/capacity.component';
import { BootcampComponent } from './components/pages/bootcamp/bootcamp.component';
import { VersionComponent } from './components/pages/version/version.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AuthGuard } from 'src/shared/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta raíz redirige a /login
  
  // Rutas protegidas
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ADMIN' }, // Especifica el rol requerido aquí
    children: [
      { path: '', redirectTo: 'technology', pathMatch: 'full' },
      { path: 'technology', component: TechnologyComponent },
      { path: 'capacity', component: CapacityComponent },
      { path: 'bootcamp', component: BootcampComponent },
      { path: 'version', component: VersionComponent }
    ],
  },

  // Redirección para cualquier otra ruta no definida
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
