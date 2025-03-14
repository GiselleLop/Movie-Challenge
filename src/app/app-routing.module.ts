import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPrincipalComponent } from './view/Home/view-principal.component';
import { ViewDetailComponent } from './view/Detail/view-detail.component';

const routes: Routes = [
  // { path: '', redirectTo: '/movies', pathMatch: 'full' },
  {path: '', component:  ViewPrincipalComponent},
  {path: 'movie-detail', component:  ViewDetailComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }