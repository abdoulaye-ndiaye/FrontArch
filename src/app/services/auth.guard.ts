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

    if (this.authService.isUserLoggedIn() && profil==expectedProfil)
      return true;

    this.router.navigate(['acceuil']);
    return false;

}

}