import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn())
      return true;

    this.router.navigate(['login']);
    return false;

}
etudiantActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this.authService.isProfilEtu())
    return true;

  this.router.navigate(['home']);
  return false;

}
profActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this.authService.isProfilProf())
    return true;

  this.router.navigate(['home']);
  return false;

}
respFormActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this.authService.isSpecialiteRespForm())
    return true;

  this.router.navigate(['home']);
  return false;

}
directeurActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this.authService.isSpecialiteDirecteur())
    return true;

  this.router.navigate(['home']);
  return false;
}
}