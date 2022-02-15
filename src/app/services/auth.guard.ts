import { BoundAttribute } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { data } from 'jquery';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot) {
  
    let profil = sessionStorage.getItem('profil');
    var expectedProfil = profil;
    if(route.data['expectedProfil']){
      expectedProfil=route.data['expectedProfil'];
    }
    
    let role = sessionStorage.getItem('specialite');
    var expectedRole = role;
    if(route.data['expectedRole']){
      expectedRole=route.data['expectedRole'];
    }
    
    var expectedRole2 = role;
    if(route.data['expectedRole2']){
      expectedRole=route.data['expectedRole2'];
    }

    if (this.authService.isUserLoggedIn() && profil==expectedProfil && (role==expectedRole || role==expectedRole2 ) )
      return true;

    this.router.navigate(['acceuil']);
    return false;

}

}