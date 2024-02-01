import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPrincipalComponent } from './view/view-principal/view-principal.component';
import { ViewDetailComponent } from './view/view-detail/view-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  {path: 'movies', component:  ViewPrincipalComponent},
  {path: 'movie-detail', component:  ViewDetailComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }