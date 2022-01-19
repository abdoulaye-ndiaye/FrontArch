import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AcceuilComponent } from './views/acceuil/acceuil.component';
import { DownloadAutorisationComponent } from './views/download-autorisation/download-autorisation.component';
import { DownloadRapportComponent } from './views/download-rapport/download-rapport.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProjetComponent } from './views/projet/projet.component';
import { RegisterComponent } from './views/register/register.component';
import { UploadDemandeAutorisationComponent } from './views/upload-demande-autorisation/upload-demande-autorisation.component';
import { UploadMemoireComponent } from './views/upload-memoire/upload-memoire.component';

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
  
  { path: '**', component: AcceuilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
