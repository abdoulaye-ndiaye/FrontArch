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
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { UploadRapportComponent } from './views/upload-rapport/upload-rapport.component';
import { UploadAutorisationComponent } from './views/upload-autorisation/upload-autorisation.component';
import { DownloadDemandeAutorisationComponent } from './views/download-demande-autorisation/download-demande-autorisation.component';
import { AjoutRapporteurComponent } from './views/ajout-rapporteur/ajout-rapporteur.component';
import { RapporteursComponent } from './views/rapporteurs/rapporteurs.component';
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
    DownloadMemoireComponent,
    HeaderComponent,
    FooterComponent,
    UploadRapportComponent,
    UploadAutorisationComponent,
    DownloadDemandeAutorisationComponent,
    AjoutRapporteurComponent,
    RapporteursComponent
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
