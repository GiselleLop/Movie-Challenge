import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/services.service';
import { AppComponent } from './app.component';
import { BodyComponent } from './component/body/body.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { ViewPrincipalComponent } from './view/view-principal/view-principal.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './services/shared.service';
import { ViewDetailComponent } from './view/view-detail/view-detail.component';
import { BodyDetailComponent } from './component/body-detail/body-detail.component';
import { MovieComponent } from './component/movie/movie.component';
import { ButtonsComponent } from './component/buttons/buttons.component';
import { FilterComponent } from './component/filter/filter.component';
import { SelectFilterComponent } from './component/select-filter/select-filter.component';

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
    ButtonsComponent,
    FilterComponent,
    SelectFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MovieService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
