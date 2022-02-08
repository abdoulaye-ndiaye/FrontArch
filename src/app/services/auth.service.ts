import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  authenticate(email: string, password: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        map((userData) => {
          sessionStorage.setItem('email', userData.email);
          let tokenStr = 'Bearer ' + userData.token;
          console.log(tokenStr);
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('profil', userData.profil);
          sessionStorage.setItem('id', userData.id);
          sessionStorage.setItem('nom', userData.nom);
          sessionStorage.setItem('prenom', userData.prenom);
          sessionStorage.setItem('dateNaissance', userData.dateNaissance);
          sessionStorage.setItem('lieuNaissance', userData.lieuNaissance);
          sessionStorage.setItem('idEtu', userData.idEtu);
          sessionStorage.setItem('idProjet', userData.idProjet);
          sessionStorage.setItem('classe', userData.classe);
          sessionStorage.setItem('specialite', userData.specialite);
          return userData;
        })
      );
  }
  RegisterEtudiant(
    classe: string,
    dateNaissance: string,
    lieuNaissance: string,
    numTel: string,
    nom: string,
    prenom: string,
    profil: string,
    email: string,
    password: string
  ) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/etudiant`, {
        dateNaissance,
        lieuNaissance,
        classe,
        numTel,
        nom,
        prenom,
        profil,
        email,
        password,
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  RegisterProf(
    specialite: string,
    numTel: string,
    nom: string,
    prenom: string,
    profil: string,
    email: string,
    password: string
  ) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/professeur`, {
        specialite,
        numTel,
        nom,
        prenom,
        profil,
        email,
        password,
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  FormulaireProjet(
    sujet: string,
    description: string,
    encadreur: string,
    date_debut: string,
    date_fin: string,
    etudiant: string,
    etat:string
  ) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/projet`, {
        sujet,
        description,
        encadreur,
        date_debut,
        date_fin,
        etudiant,
        etat
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('token');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('profil');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('idEtu');
    sessionStorage.removeItem('idProjet');
    sessionStorage.removeItem('nom');
    sessionStorage.removeItem('prenom');
    sessionStorage.removeItem('dateNaissance');
    sessionStorage.removeItem('lieuNaissance');
    sessionStorage.removeItem('classe');
    sessionStorage.removeItem('specialite');
  }

  getProfesseur(idProf: string) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/professeur/${idProf}`
    );
  }
  getEncadreur(idProjet: string) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/encadreur/projet/${idProjet}`
    );
  }
  getRapporteur(idProjet: string) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/rapporteur/projet/${idProjet}`
    );
  }
  getEtudiant(idEtudiant: string) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/etudiant/${idEtudiant}`
    );
  }
  getProjet(idProjet: string) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/projet/${idProjet}`
    );
  }
  getProjets() {
    return this.httpClient.get<any>(`${environment.apiUrl}/projet`);
  }
  getComptes() {
    return this.httpClient.get<any>(`${environment.apiUrl}/compte`);
  }
  getProfs() {
    return this.httpClient.get<any>(`${environment.apiUrl}/professeur`);
  }
  getProjetByIdEtudiant(idEtu: string) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/projet/etudiant/${idEtu}`
    );
  }
  
  downloadFichier(url: string): void {
    this.httpClient.get(`${url}`, { responseType: 'blob' }).subscribe((res) => {
      window.open(window.URL.createObjectURL(res));
    });
  }
 
  
  getRapport() {
    return this.httpClient.get<any>(`${environment.apiUrl}/rapportRapporteur`);
  }
  getAutorisation() {
    return this.httpClient.get<any>(`${environment.apiUrl}/autorisation`);
  }
  getDemandeAutorisation() {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/demandesAutorisation`
    );
  }
  getMemoire() {
    return this.httpClient.get<any>(`${environment.apiUrl}/memoire`);
  }
  getCompte(idCompte: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/compte/${idCompte}`);
  }
  listeEtudiant() {
    return this.httpClient.get<any>(`${environment.apiUrl}/etudiant`);
  }
  listeProfesseur() {
    return this.httpClient.get<any>(`${environment.apiUrl}/professeur`);
  }

  ajoutRapporteur(idProf: string, idProjet: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/ajout-rapporteur`, { idProf, idProjet })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  supprimerRapporteur(idProf: string, idProjet: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/supprimer-rapporteur`, { idProf, idProjet })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  changerPassword(idCompte: string, password: string) {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/changer-password/${idCompte}`, {
        password
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
}
