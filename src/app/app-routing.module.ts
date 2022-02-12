import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AcceuilComponent } from './views/acceuil/acceuil.component';
import { AjoutRapporteurComponent } from './views/ajout-rapporteur/ajout-rapporteur.component';
import { ChangerPasswordComponent } from './views/changer-password/changer-password.component';
import { DemandeAutorisationComponent } from './views/demande-autorisation/demande-autorisation/demande-autorisation.component';
import { AutorisationComponent } from './views/dossier/autorisation/autorisation.component';
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
import { ProjetComponent } from './views/projet/projet.component';
import { RapporteursComponent } from './views/rapporteurs/rapporteurs.component';
import { RegisterComponent } from './views/register/register.component';
import { CreerProjetComponent } from './views/resp-form/creer-projet/creer-projet.component';
import { ListeEtudiantsComponent } from './views/resp-form/liste-etudiants/liste-etudiants.component';
import { ModifProjetComponent } from './views/resp-form/modif-projet/modif-projet.component';
import { UploadAutorisationComponent } from './views/upload-autorisation/upload-autorisation.component';
import { UploadDemandeAutorisationComponent } from './views/upload-demande-autorisation/upload-demande-autorisation.component';
import { UploadMemoireComponent } from './views/upload-memoire/upload-memoire.component';
import { UploadRapportComponent } from './views/upload-rapport/upload-rapport.component';

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
      title: 'Register'
    }
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
      title: 'Projet'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-memoire',
    component: UploadMemoireComponent,
    data: {
      title: 'Upload-Memoire'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-demande-autorisation',
    component: UploadDemandeAutorisationComponent,
    data: {
      title: 'Upload-Demande-Autorisation'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-rapport',
    component: UploadRapportComponent,
    data: {
      title: 'Upload-Rapport'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'upload-autorisation',
    component: UploadAutorisationComponent,
    data: {
      title: 'Upload-Autorisation'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'ajout-rapporteur',
    component: AjoutRapporteurComponent,
    data: {
      title: 'Ajout-Rapporteur'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'rapporteurs',
    component: RapporteursComponent,
    data: {
      title: 'Rapporteurs'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'creer-projet',
    component: CreerProjetComponent,
    data: {
      title: 'Creer-Projet'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'liste-etudiants',
    component: ListeEtudiantsComponent,
    data: {
      title: 'Liste Etudiants'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'etudiants',
    component: EtudiantsComponent,
    data: {
      title: 'Etudiants'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'excel-etudiant',
    component: ExcelEtudiantComponent,
    data: {
      title: 'Excel Etudiant'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'excel-prof',
    component: ExcelProfComponent,
    data: {
      title: 'Excel Professeur'
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
      title: 'Dossiers Etudiants'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'memoire',
    component: MemoireComponent,
    data: {
      title: 'Memoire Etudiant'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'pv',
    component: PvComponent,
    data: {
      title: 'PVs Etudiant'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'rapport',
    component: RapportComponent,
    data: {
      title: 'Rapports Etudiant'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'autorisation',
    component: AutorisationComponent,
    data: {
      title: 'Autorisation Etudiant'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'modif-projet',
    component: ModifProjetComponent,
    data: {
      title: 'Modifier projet'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'creer-jury',
    component: CreerJuryComponent,
    data: {
      title: 'creer jury'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'jury',
    component: JuryComponent,
    data: {
      title: 'Jury'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'liste-projets',
    component: ListeProjetsComponent,
    data: {
      title: 'Liste projets'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'encadreurs',
    component: EncadreursComponent,
    data: {
      title: 'Encadreurs'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'demande-autorisation',
    component: DemandeAutorisationComponent,
    data: {
      title: 'Demande Autorisation'
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
