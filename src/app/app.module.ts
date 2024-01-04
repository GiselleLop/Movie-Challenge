import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/services.service';
import { AppComponent } from './app.component';
import { InterfacesComponent } from './interfaces/interfaces.component';
import { BodyComponent } from './component/body/body.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { ViewPrincipalComponent } from './view/view-principal/view-principal.component';
import { AppRoutingModule, routing } from './app-routing.module';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    InterfacesComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    ViewPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [MovieService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
