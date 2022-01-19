import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './views/acceuil/acceuil.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicAuthInterceptorService } from './services/_helpers/basic-auth-interceptor.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {DataTablesModule} from 'angular-datatables';
import { HomeComponent } from './views/home/home.component';
import { ProjetComponent } from './views/projet/projet.component';
import { UploadMemoireComponent } from './views/upload-memoire/upload-memoire.component';
import { DownloadRapportComponent } from './views/download-rapport/download-rapport.component';
import { UploadDemandeAutorisationComponent } from './views/upload-demande-autorisation/upload-demande-autorisation.component';
import { DownloadAutorisationComponent } from './views/download-autorisation/download-autorisation.component';
import { DownloadMemoireComponent } from './views/download-memoire/download-memoire.component';

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProjetComponent,
    UploadMemoireComponent,
    DownloadRapportComponent,
    UploadDemandeAutorisationComponent,
    DownloadAutorisationComponent,
    DownloadMemoireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass : BasicAuthInterceptorService , multi:true},
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
