import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { ApiService } from './services/api.service';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { SearchPipe } from './pipes/search.pipe';
import { ProductService } from './services/product.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoadingComponent,
    SearchPipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    AuthGuard,
    LoginService,
    ApiService,
    ProductService,
    SearchPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
