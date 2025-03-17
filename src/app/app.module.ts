import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { AppComponent } from './app.component';
import { BodyComponent } from './view/Home/components/Body/body.component';
import { FooterComponent } from './view/Home/components/Footer/footer.component';
import { HeaderComponent } from './view/Home/components/Header/header.component';
import { ViewPrincipalComponent } from './view/Home/view-principal.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './services/shared.service';
import { ViewDetailComponent } from './view/Detail/view-detail.component';
import { BodyDetailComponent } from './component/body-detail/body-detail.component';
import { MovieComponent } from './view/Home/components/Body/components/Movie/movie.component';
import { FilterComponent } from './view/Home/components/Body/components/Filter/filter.component';
// import { PaginatorModule } from 'primeng/paginator'; 
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    ViewPrincipalComponent,
    ViewDetailComponent,
    BodyDetailComponent,
    MovieComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    // PaginatorModule,
    CommonModule
  ],
  providers: [MovieService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
