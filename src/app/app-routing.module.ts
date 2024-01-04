import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewPrincipalComponent } from './view/view-principal/view-principal.component';

const routes: Routes = [{
path: '', component:  ViewPrincipalComponent,
}]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);