import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AcceuilComponent } from './views/acceuil/acceuil.component';
import { AjoutRapporteurComponent } from './views/ajout-rapporteur/ajout-rapporteur.component';
import { UploadArticleComponent } from './views/upload-article/upload-article.component';
import { ChangerPasswordComponent } from './views/changer-password/changer-password.component';
import { DemandeAutorisationComponent } from './views/demande-autorisation/demande-autorisation/demande-autorisation.component';
import { DesComPfeComponent } from './views/des-com-pfe/des-com-pfe.component';
import { CertificatComponent } from './views/dossier/certificat/certificat.component';
import { DAutorisationComponent } from './views/dossier/d-autorisation/d-autorisation.component';
import { DComPfeComponent } from './views/dossier/d-com-pfe/d-com-pfe.component';
import { DossierComponent } from './views/dossier/dossier/dossier.component';
import { EtudiantsComponent } from './views/dossier/etudiants/etudiants.component';
import { MemoireComponent } from './views/dossier/memoire/memoire.component';
import { PvComponent } from './views/dossier/pv/pv.component';
import { RapportComponent } from './views/dossier/rapport/rapport.component';
import { EncadreursComponent } from './views/encadreurs/encadreurs.component';
import { ExcelEtudiantComponent } from './views/excel/excel-etudiant/excel-etudiant.component';
import { ExcelProfComponent } from './views/excel/excel-prof/excel-prof.component';
import { HomeComponent } from './views/home/home.component';
import { CreerJuryComponent } from './views/jury/creer-jury/creer-jury.component';
import { JuryComponent } from './views/jury/jury/jury.component';
import { ListeProjetsComponent } from './views/jury/liste-projets/liste-projets.component';
import { LoginComponent } from './views/login/login.component';
import { NoteComponent } from './views/note/note.component';
import { ProjetComponent } from './views/projet/projet.component';
import { PvSoutenanceComponent } from './views/pv-soutenance/pv-soutenance.component';
import { RapporteursComponent } from './views/rapporteurs/rapporteurs.component';
import { RegisterProfComponent } from './views/register-prof/register-prof.component';
import { RegisterComponent } from './views/register/register.component';
import { CreerProjetComponent } from './views/resp-form/creer-projet/creer-projet.component';
import { ListeEtudiantsComponent } from './views/resp-form/liste-etudiants/liste-etudiants.component';
import { ModifProjetComponent } from './views/resp-form/modif-projet/modif-projet.component';
import { UploadCertificatComponent } from './views/upload-certificat/upload-certificat.component';
import { UploadDecisionPfeComponent } from './views/upload-decision-pfe/upload-decision-pfe.component';
import { UploadDemandeAutorisationComponent } from './views/upload-demande-autorisation/upload-demande-autorisation.component';
import { UploadMemoireComponent } from './views/upload-memoire/upload-memoire.component';
import { UploadRapportComponent } from './views/upload-rapport/upload-rapport.component';
import { ArticleComponent } from './views/article/article.component';
import { UploadMemoireFiniComponent } from './views/upload-memoire-fini/upload-memoire-fini.component';
import { MotDePassOublierComponent } from './views/mot-de-pass-oublier/mot-de-pass-oublier.component';
import { CreerRapportComponent } from './views/creer-rapport/creer-rapport.component';
import { FormRapportComponent } from './views/form-rapport/form-rapport.component';
import { GestionEtudiantsComponent } from './views/gestion-etudiants/gestion-etudiants.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'acceuil',
    pathMatch: 'full',
  },
  {
    path: 'acceuil',
    component: AcceuilComponent,
    data: {
      title: 'Acceuil'
    }
  },
  {
    path: 'motDePassOublier',
    component: MotDePassOublierComponent,
    data: {
      title: 'Reinitialiser'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Etudiant',
      excepteRole: 'ADMIN',
      expectedProfil: 'ADMIN'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'register-prof',
    component: RegisterProfComponent,
    data: {
      title: 'Register Professeur',
      excepteRole: 'ADMIN',
      expectedProfil: 'ADMIN'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'gestion-etudiants',
    component: GestionEtudiantsComponent,
    data: {
      title: 'Gestion Etudiants',
      excepteRole: 'ADMIN',
      expectedProfil: 'ADMIN'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'projet',
    component: ProjetComponent,
    data: {
      title: 'Projet',
      expectedProfil: 'ETUDIANT'
    },
    canActivate:[AuthGuard],
  },
  {
    path: 'upload-memoire',
    component: UploadMemoireComponent,
    data: {
      title: 'Upload-Memoire',
      expectedProfil: 'ETUDIANT'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-decision-pfe',
    component: UploadDecisionPfeComponent,
    data: {
      title: 'Upload-Decision-Pfe',
      expectedRole: 'DIRECTEUR',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-demande-autorisation',
    component: UploadDemandeAutorisationComponent,
    data: {
      title: 'Upload-Demande-Autorisation',
      expectedProfil: 'ETUDIANT'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-rapport',
    component: UploadRapportComponent,
    data: {
      title: 'Upload-Rapport',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'creer-rapport',
    component: CreerRapportComponent,
    data: {
      title: 'Créer Rapport',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'form-rapport',
    component: FormRapportComponent,
    data: {
      title: 'formulaire Rapport',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-certificat',
    component: UploadCertificatComponent,
    data: {
      title: 'Upload-Certificat',
      expectedProfil: 'ETUDIANT'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'ajout-rapporteur',
    component: AjoutRapporteurComponent,
    data: {
      title: 'Ajout-Rapporteur',
      expectedRole: 'RESP-FORM',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'rapporteurs',
    component: RapporteursComponent,
    data: {
      title: 'Rapporteurs',
      expectedRole: 'RESP-FORM',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'creer-projet',
    component: CreerProjetComponent,
    data: {
      title: 'Creer-Projet',
      expectedProfil: 'ETUDIANT'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'liste-etudiants',
    component: ListeEtudiantsComponent,
    data: {
      title: 'Liste Etudiants',
      expectedRole: 'RESP-FORM',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'etudiants',
    component: EtudiantsComponent,
    data: {
      title: 'Etudiants',
      expectedProfil: 'PROF',
      expectedRole: 'RESP-FORM',
      expectedRole2: 'DIRECTEUR'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'excel-etudiant',
    component: ExcelEtudiantComponent,
    data: {
      title: 'Excel Etudiant',
      expectedProfil: 'ADMIN'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'excel-prof',
    component: ExcelProfComponent,
    data: {
      title: 'Excel Professeur',
      expectedProfil: 'ADMIN'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'changer-password',
    component: ChangerPasswordComponent,
    data: {
      title: 'Modifier Mot de Pass'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'dossier',
    component: DossierComponent,
    data: {
      title: 'Dossiers Etudiants',
      expectedProfil: 'PROF',
      expectedRole: 'RESP-FORM',
      expectedRole2: 'DIRECTEUR'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'memoire',
    component: MemoireComponent,
    data: {
      title: 'Memoire Etudiant',
      expectedProfil: 'PROF',
      expectedRole: 'RESP-FORM',
      expectedRole2: 'DIRECTEUR'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'd-autorisation',
    component: DAutorisationComponent,
    data: {
      title: 'Demande Autorisation Etudiant',
      expectedProfil: 'PROF',
      expectedRole: 'RESP-FORM',
      expectedRole2: 'DIRECTEUR'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'd-com-pfe',
    component: DComPfeComponent,
    data: {
      title: 'Décision des Cmomission Pfe Etudiant',
      expectedProfil: 'PROF',
      expectedRole: 'RESP-FORM',
      expectedRole2: 'DIRECTEUR'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'des-com-pfe',
    component: DesComPfeComponent,
    data: {
      title: 'Décision Commission des PFE',
      expectedProfil: 'PROF',
      expectedRole: 'RESP-FORM'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'pv',
    component: PvComponent,
    data: {
      title: 'PVs Etudiant',
      expectedProfil: 'PROF',
      expectedRole: 'RESP-FORM',
      expectedRole2: 'DIRECTEUR'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'rapport',
    component: RapportComponent,
    data: {
      title: 'Rapports Etudiant',
      expectedProfil: 'PROF',
      expectedRole: 'RESP-FORM',
      expectedRole2: 'DIRECTEUR'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'certificat',
    component: CertificatComponent,
    data: {
      title: 'Certificat inscription',
      expectedProfil: 'PROF',
      expectedRole: 'RESP-FORM',
      expectedRole2: 'DIRECTEUR'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'modif-projet',
    component: ModifProjetComponent,
    data: {
      title: 'Modifier projet',
      expectedProfil: 'ETUDIANT'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'creer-jury',
    component: CreerJuryComponent,
    data: {
      title: 'creer jury',
      expectedRole: 'RESP-FORM',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'jury',
    component: JuryComponent,
    data: {
      title: 'Jury',
      expectedRole: 'RESP-FORM',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'liste-projets',
    component: ListeProjetsComponent,
    data: {
      title: 'Liste projets',
      expectedRole: 'RESP-FORM',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'encadreurs',
    component: EncadreursComponent,
    data: {
      title: 'Encadreurs',
      expectedProfil: 'ETUDIANT'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'demande-autorisation',
    component: DemandeAutorisationComponent,
    data: {
      title: 'Demande Autorisation',
      expectedProfil: 'ETUDIANT'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'pv-soutenance',
    component: PvSoutenanceComponent,
    data: {
      title: 'PV Soutenance',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'note',
    component: NoteComponent,
    data: {
      title: 'Note Soutenance',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-article',
    component: UploadArticleComponent,
    data: {
      title: 'Créer Article',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'article',
    component: ArticleComponent,
    data: {
      title: 'Mes Articles',
      expectedProfil: 'PROF'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-memoire-fini',
    component: UploadMemoireFiniComponent,
    data: {
      title: 'Upload Memoire Fini',
      excepteRole: 'ADMIN',
      expectedProfil: 'ADMIN'
    },
    canActivate:[AuthGuard]
  },
  
  { path: '**', component: AcceuilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
