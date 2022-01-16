import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AcceuilComponent } from './views/acceuil/acceuil.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProjetComponent } from './views/projet/projet.component';
import { RegisterComponent } from './views/register/register.component';

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
  
  { path: '**', component: AcceuilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
