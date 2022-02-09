import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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
import { UploadDemandeAutorisationComponent } from './views/upload-demande-autorisation/upload-demande-autorisation.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { UploadRapportComponent } from './views/upload-rapport/upload-rapport.component';
import { UploadAutorisationComponent } from './views/upload-autorisation/upload-autorisation.component';
import { AjoutRapporteurComponent } from './views/ajout-rapporteur/ajout-rapporteur.component';
import { RapporteursComponent } from './views/rapporteurs/rapporteurs.component';
import { CreerProjetComponent } from './views/resp-form/creer-projet/creer-projet.component';
import { ListeEtudiantsComponent } from './views/resp-form/liste-etudiants/liste-etudiants.component';
import { ExcelEtudiantComponent } from './views/excel/excel-etudiant/excel-etudiant.component';
import { ExcelProfComponent } from './views/excel/excel-prof/excel-prof.component';
import { NavComponent } from './views/nav/nav.component';
import { ChangerPasswordComponent } from './views/changer-password/changer-password.component';
import { DossierComponent } from './views/dossier/dossier/dossier.component';
import { EtudiantsComponent } from './views/dossier/etudiants/etudiants.component';
import { MemoireComponent } from './views/dossier/memoire/memoire.component';
import { PvComponent } from './views/dossier/pv/pv.component';
import { RapportComponent } from './views/dossier/rapport/rapport.component';
import { AutorisationComponent } from './views/dossier/autorisation/autorisation.component';
@NgModule({
  
  declarations: [
    AppComponent,
    AcceuilComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProjetComponent,
    UploadMemoireComponent,
    UploadDemandeAutorisationComponent,
    HeaderComponent,
    FooterComponent,
    UploadRapportComponent,
    UploadAutorisationComponent,
    AjoutRapporteurComponent,
    RapporteursComponent,
    CreerProjetComponent,
    ListeEtudiantsComponent,
    ExcelEtudiantComponent,
    ExcelProfComponent,
    NavComponent,
    ChangerPasswordComponent,
    DossierComponent,
    EtudiantsComponent,
    MemoireComponent,
    PvComponent,
    RapportComponent,
    AutorisationComponent
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({ /* options */ }),

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
