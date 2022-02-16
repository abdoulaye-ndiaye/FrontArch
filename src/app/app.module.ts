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
import { UploadCertificatComponent } from './views/upload-certificat/upload-certificat.component';
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
import { CertificatComponent } from './views/dossier/certificat/certificat.component';
import { ModifProjetComponent } from './views/resp-form/modif-projet/modif-projet.component';
import { CreerJuryComponent } from './views/jury/creer-jury/creer-jury.component';
import { JuryComponent } from './views/jury/jury/jury.component';
import { ListeProjetsComponent } from './views/jury/liste-projets/liste-projets.component';
import { EncadreursComponent } from './views/encadreurs/encadreurs.component';
import { DemandeAutorisationComponent } from './views/demande-autorisation/demande-autorisation/demande-autorisation.component';

import { DatePipe } from '@angular/common';
import { PvSoutenanceComponent } from './views/pv-soutenance/pv-soutenance.component';
import { NoteComponent } from './views/note/note.component';
import { DAutorisationComponent } from './views/dossier/d-autorisation/d-autorisation.component';
import { DesComPfeComponent } from './views/des-com-pfe/des-com-pfe.component';
import { DComPfeComponent } from './views/dossier/d-com-pfe/d-com-pfe.component';
import { UploadDecisionPfeComponent } from './views/upload-decision-pfe/upload-decision-pfe.component';
import { RegisterProfComponent } from './views/register-prof/register-prof.component';
import { UploadArticleComponent } from './views/upload-article/upload-article.component';
import { ArticleComponent } from './views/article/article.component';
import { UploadMemoireFiniComponent } from './views/upload-memoire-fini/upload-memoire-fini.component';

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
    UploadCertificatComponent,
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
    CertificatComponent,
    ModifProjetComponent,
    CreerJuryComponent,
    JuryComponent,
    ListeProjetsComponent,
    EncadreursComponent,
    DemandeAutorisationComponent,
    PvSoutenanceComponent,
    NoteComponent,
    DAutorisationComponent,
    DesComPfeComponent,
    DComPfeComponent,
    UploadDecisionPfeComponent,
    RegisterProfComponent,
    UploadArticleComponent,
    ArticleComponent,
    UploadMemoireFiniComponent
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
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
