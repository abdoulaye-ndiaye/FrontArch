import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  authenticate(email: string, password: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        map((userData) => {
          const token = userData.token as string;
          const tokenInfo = this.getDecodedAccessToken(token); // decode token
          
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('email', tokenInfo.email);
          sessionStorage.setItem('profil', tokenInfo.profil);
          sessionStorage.setItem('id', tokenInfo._id);
          sessionStorage.setItem('nom', tokenInfo.nom);
          sessionStorage.setItem('prenom', tokenInfo.prenom);
          sessionStorage.setItem('dateNaissance', tokenInfo.dateNaissance);
          sessionStorage.setItem('lieuNaissance', tokenInfo.lieuNaissance);
          sessionStorage.setItem('idEtu', tokenInfo.idEtu);
          sessionStorage.setItem('idProf', tokenInfo.idProf);
          sessionStorage.setItem('idProjet', tokenInfo.idProjet);
          sessionStorage.setItem('classe', tokenInfo.classe);
          sessionStorage.setItem('specialite', tokenInfo.specialite);

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
    code: string,
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
        code,
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
    etudiant: string
  ) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/projet`, {
        sujet,
        description,
        etudiant
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('token');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('profil');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('idEtu');
    sessionStorage.removeItem('idProf');
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
  verifEmail(email: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/compte/verif`, {
        email
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  getProjets() {
    return this.httpClient.get<any>(`${environment.apiUrl}/projet`);
  }
  getProjets2() {
    return this.httpClient.get<any>(`${environment.apiUrl}/projets`);
  }
  getArticles() {
    return this.httpClient.get<any>(`${environment.apiUrl}/article`);
  }
  getMemoiresFinis() {
    return this.httpClient.get<any>(`${environment.apiUrl}/memoireFini`);
  }
  getComptes() {
    return this.httpClient.get<any>(`${environment.apiUrl}/compte`);
  }
  getProfs() {
    return this.httpClient.get<any>(`${environment.apiUrl}/professeur`);
  }
  getEtudiants() {
    return this.httpClient.get<any>(`${environment.apiUrl}/etudiant`);
  }
  getProjetByIdEtudiant(idEtu: string) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/projet/etudiant/${idEtu}`
    );
  }
  
  downloadFichier(url: string): void {
    this.httpClient.get(`${url}`, { responseType: 'blob' }).subscribe((res) => {
      window.open(window.URL.createObjectURL(res));
      Swal.close()
    });
  }
 
  
  getRapport() {
    return this.httpClient.get<any>(`${environment.apiUrl}/rapportRapporteur`);
  }
  
  getDemandeAutorisation() {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/demandesAutorisation`
    );
  }
  getMemoire() {
    return this.httpClient.get<any>(`${environment.apiUrl}/memoire`);
  }
  getDecisionPfe() {
    return this.httpClient.get<any>(`${environment.apiUrl}/decisionPfe`);
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
  updateProjet(idProjet: string, sujet: string, description: string) {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/projet/${idProjet}`, {
        sujet,description
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  updateJury(idJury: string, batiment: string, salleSoutenance: string, numJury:string, presidentJury:string) {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/jury/${idJury}`, {
        batiment,salleSoutenance,numJury,presidentJury
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }

  ajoutMembreJury(idProf: string, idProjet: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/ajout-membre-jury`, { idProf, idProjet })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  supprimerMembreJury(idProf: string, idProjet: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/supprimer-membre-jury`, { idProf, idProjet })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  FormulaireJury(
    batiment: string,
    salleSoutenance: string,
    numJury: any,
    presidentJury:string,
    idProjet:string
    
  ) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/jury`, {
        batiment,
        salleSoutenance,
        numJury,
        presidentJury,
        idProjet
        
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  FormulaireNote(
    valeur: string,
    mention: string,
    idProjet:string
    
  ) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/note`, {
        valeur,
        mention,
        idProjet
        
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  ajoutEncadreur(idProf: string, idProjet: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/ajout-encadreur`, { idProf, idProjet })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  supprimerEncadreur(idProf: string, idProjet: string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/supprimer-encadreur`, { idProf, idProjet })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }

  ForgotPassword(email: string,) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/email`, {
        email
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  changerNbTelMemoirefini(idMemoireFini: string, nbTelechargement: any) {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/nbTelechargementMemoireFini/${idMemoireFini}`, {
        nbTelechargement
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  changerNbTelArticle(idArticle: string, nbTelechargement: any) {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/nbTelechargementArticle/${idArticle}`, {
        nbTelechargement
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  bloquerCompte(idCompte: string) {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/bloquer-compte/${idCompte}`, {
        
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }
  debloquerCompte(idCompte: string) {
    return this.httpClient
      .put<any>(`${environment.apiUrl}/debloquer-compte/${idCompte}`, {
        
      })
      .pipe(
        map((userData) => {
          return userData;
        })
      );
  }

  supprimerArticle(idArticle:string, idProf:string){
    return this.httpClient
    .post<any>(`${environment.apiUrl}/article-delete/${idArticle}`, {
      idProf
    })
    .pipe(
      map((userData) => {
        return userData;
      })
    );
  }
  supprimerCertificat(idCertificat:string, idProj:string){
    return this.httpClient
    .post<any>(`${environment.apiUrl}/certificat-delete/${idCertificat}`, {
      idProj
    })
    .pipe(
      map((userData) => {
        return userData;
      })
    );
  }
  supprimerDemandesAutorisation(idDemande:string, idProj:string){
    return this.httpClient
    .post<any>(`${environment.apiUrl}/demandesAutorisation-delete/${idDemande}`, {
      idProj
    })
    .pipe(
      map((userData) => {
        return userData;
      })
    );
  }
  supprimerMemoire(idMemoire:string, idProj:string){
    return this.httpClient
    .post<any>(`${environment.apiUrl}/memoire-delete/${idMemoire}`, {
      idProj
    })
    .pipe(
      map((userData) => {
        return userData;
      })
    );
  }
  supprimerDecisionPfe(idDecision:string, idProj:string){
    return this.httpClient
    .post<any>(`${environment.apiUrl}/decisionPfe-delete/${idDecision}`, {
      idProj
    })
    .pipe(
      map((userData) => {
        return userData;
      })
    );
  }
  supprimerMemoireFini(idMemoireFini:string){
    return this.httpClient
    .delete<any>(`${environment.apiUrl}/memoireFini/${idMemoireFini}`, {
    
    })
    .pipe(
      map((userData) => {
        return userData;
      })
    );
  }
}
