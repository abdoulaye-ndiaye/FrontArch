import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  authenticate(email:string, password:string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("email", userData.email);
          let tokenStr = "Bearer " + userData.token;
          console.log(tokenStr);
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("profil", userData.profil);
          sessionStorage.setItem("id", userData.id);
          return userData;
        })
      );
  }
  RegisterEtudiant( dateNaissance:string, lieuNaissance:string, numTel:string, nom:string, prenom:string, profil:string, email:string, password:string, login:string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/etudiant`, { dateNaissance, lieuNaissance, numTel, nom, prenom, profil, email, password, login })
      .pipe(
        map(userData => {
          return userData;
        })
      );
  }
  RegisterProf(numTel:string, nom:string, prenom:string, profil:string, email:string, password:string, login:string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/professeur`, { numTel, nom, prenom, profil, email, password, login })
      .pipe(
        map(userData => {
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("login");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("token");
  }

  getEncadreur(idProf:string) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/etudiant/projet/${idProf}`);
  }
  getEtudiant(idEtudiant:string) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/etudiant/${idEtudiant}`);
  }
  getProjets() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/projet`);
  }
}

