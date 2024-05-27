import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LibraryComponent } from './components/pages/library/library.component';
import { TechnologyComponent } from './components/pages/technology/technology.component';
import { CapacityComponent } from './components/pages/capacity/capacity.component';
import { BootcampComponent } from './components/pages/bootcamp/bootcamp.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'library',
    component: LibraryComponent,
    children: [
      { path: '', redirectTo: 'technology', pathMatch: 'full' },
      { path: 'technology', component: TechnologyComponent },
      { path: 'capacity', component: CapacityComponent },
      { path: 'bootcamp', component: BootcampComponent,}
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
