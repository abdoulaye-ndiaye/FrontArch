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
          sessionStorage.setItem("nom", userData.nom);
          sessionStorage.setItem("prenom", userData.prenom);
          sessionStorage.setItem("dateNaissance", userData.dateNaissance);
          sessionStorage.setItem("lieuNaissance", userData.lieuNaissance);
          sessionStorage.setItem("idEtu", userData.idEtu);

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
    sessionStorage.removeItem("idEtu");
    sessionStorage.removeItem("nom");
    sessionStorage.removeItem("prenom");
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
  getProjetByIdEtudiant(idEtu:string) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/projet/etudiant/${idEtu}`);
      
  }
  downloadRapport(idRapport:string): void {
    this.httpClient
    .get(`${environment.apiUrl}/download-rapport/${idRapport}`, { responseType: 'blob'})
    .subscribe(res => {
      window.open(window.URL.createObjectURL(res));
    });
  }
  downloadMemoire(idRapport:string): void {
    this.httpClient
    .get(`${environment.apiUrl}/download-memoire/${idRapport}`, { responseType: 'blob'})
    .subscribe(res => {
      window.open(window.URL.createObjectURL(res));
    });
  }
  downloadAutorisation(idAutorisation:string): void {
    this.httpClient
    .get(`${environment.apiUrl}/download-autorisation/${idAutorisation}`, { responseType: 'blob'})
    .subscribe(res => {
      window.open(window.URL.createObjectURL(res));
    });
  }
  downloadDemandeAutorisation(idAutorisation:string): void {
    this.httpClient
    .get(`${environment.apiUrl}/download-demandesAutorisation/${idAutorisation}`, { responseType: 'blob'})
    .subscribe(res => {
      window.open(window.URL.createObjectURL(res));
    });
  }
  getRapport() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/rapportRapporteur`);
  }
  getAutorisation() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/autorisation`);
  }
  getDemandeAutorisation() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/demandesAutorisation`);
  }
  getMemoire() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/memoire`);
  }
  getCompte(idCompte:string) {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/compte/${idCompte}`);
  }
}

