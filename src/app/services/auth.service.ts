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
          sessionStorage.setItem("dateNaissance", userData.dateNaissance);
          sessionStorage.setItem("lieuNaissance", userData.lieuNaissance);

          return userData;
        })
      );
  }
  RegisterEtudiant( dateNaissance:string, lieuNaissance:string, numTel:string, nom:string, prenom:string, profil:string, email:string, password:string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/etudiant`, { dateNaissance, lieuNaissance, numTel, nom, prenom, profil, email, password })
      .pipe(
        map(userData => {
          return userData;
        })
      );
  }
  RegisterProf(numTel:string, nom:string, prenom:string, profil:string, email:string, password:string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/professeur`, { numTel, nom, prenom, profil, email, password })
      .pipe(
        map(userData => {
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("token");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("profil");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("dateNaissance");
    sessionStorage.removeItem("lieuNaissance");
  }

  getProfesseur(idProf:string) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/professeur/${idProf}`);
  }
  getEncadreur(idProjet:string) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/encadreur/projet/${idProjet}`);
  }
  getEtudiant(idEtudiant:string) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/etudiant/${idEtudiant}`);
  }
  getProjets() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/projet`);
      
  }
  getCompte(idCompte:string) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/compte/${idCompte}`);
  }
}

