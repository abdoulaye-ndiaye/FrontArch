import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AcceuilComponent } from './views/acceuil/acceuil.component';
import { AjoutRapporteurComponent } from './views/ajout-rapporteur/ajout-rapporteur.component';
import { DownloadAutorisationComponent } from './views/download-autorisation/download-autorisation.component';
import { DownloadDemandeAutorisationComponent } from './views/download-demande-autorisation/download-demande-autorisation.component';
import { DownloadMemoireComponent } from './views/download-memoire/download-memoire.component';
import { DownloadRapportComponent } from './views/download-rapport/download-rapport.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProjetComponent } from './views/projet/projet.component';
import { RapporteursComponent } from './views/rapporteurs/rapporteurs.component';
import { RegisterComponent } from './views/register/register.component';
import { CreerProjetComponent } from './views/resp-form/creer-projet/creer-projet.component';
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
    path: 'download-rapport',
    component: DownloadRapportComponent,
    data: {
      title: 'Download-Rapport'
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
    path: 'download-autorisation',
    component: DownloadAutorisationComponent,
    data: {
      title: 'Download-Autorisation'
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'download-memoire',
    component: DownloadMemoireComponent,
    data: {
      title: 'Download-Memoire'
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
    path: 'download-demande-autorisation',
    component: DownloadDemandeAutorisationComponent,
    data: {
      title: 'Download-Demande-Autorisation'
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
  
  { path: '**', component: AcceuilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
