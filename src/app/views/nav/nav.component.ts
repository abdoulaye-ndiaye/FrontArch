import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Input() inputFromParent : string;
  profil = sessionStorage.getItem("profil");
  specialite = sessionStorage.getItem("specialite");
  idEtu = sessionStorage.getItem("idEtu") as string;
  afficheProjet=true;
  afficheMemoire=true;
  afficheDemande=true;
  afficheCertificat=true;
  masque:any;


  home="";ajoutRapporteur="";excelEtudiant="";excelProf="";projet="";rapporteurs="";respForm="";
  uploadCertificat="";demandeAutorisation="";uploadMemoire="";uploadRapport="";changerPassword="";
  dossier="";memoire="";pv="";encadreur="";jury="";uploadDemandeAutorisation="";pvSoutenance="";
  note="";desComPfe="";uploadDecisionPfe="";registerEtudiant="";registerProf="";article="";
  memoireFini="";creerRapport="";formRapport="";gestionEtudiants="";gestionProfesseurs="";
  rapporteur="";uploadPv="";gestionMemoiresFini="";

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.test();
  }
  test(){
    if (this.inputFromParent=='home'){this.home="active";}
    if (this.inputFromParent=='ajout-rapporteur'){this.ajoutRapporteur="active";}
    if (this.inputFromParent=='excel-etudiant'){this.excelEtudiant="active";}
    if (this.inputFromParent=='excel-prof'){this.excelProf="active";}
    if (this.inputFromParent=='projet'){this.projet="active";}
    if (this.inputFromParent=='rapporteurs'){this.dossier="active";}
    if (this.inputFromParent=='resp-form'){this.respForm="active";}
    if (this.inputFromParent=='upload-certificat'){this.uploadCertificat="active";}
    if (this.inputFromParent=='demande-autorisation'){this.demandeAutorisation="active";}
    if (this.inputFromParent=='upload-memoire'){this.uploadMemoire="active";}
    if (this.inputFromParent=='upload-decision-pfe'){this.uploadDecisionPfe="active";}
    if (this.inputFromParent=='upload-rapport'){this.uploadRapport="active";}
    if (this.inputFromParent=='changer-password'){this.home="active";}
    if (this.inputFromParent=='dossier'){this.dossier="active";}
    if (this.inputFromParent=='memoire'){this.dossier="active";}
    if (this.inputFromParent=='d-autorisation'){this.dossier="active";}
    if (this.inputFromParent=='pv'){this.dossier="active";}
    if (this.inputFromParent=='autorisation'){this.dossier="active";}
    if (this.inputFromParent=='rapport'){this.dossier="active";}
    if (this.inputFromParent=='encadreurs'){this.encadreur="active";}
    if (this.inputFromParent=='creer-jury'){this.dossier="active";}
    if (this.inputFromParent=='jury'){this.dossier="active";}
    if (this.inputFromParent=='liste-projets'){this.dossier="active";}
    if (this.inputFromParent=='upload-demande-autorisation'){this.uploadDemandeAutorisation="active";}
    if (this.inputFromParent=='pv-soutenance'){this.pvSoutenance="active";}
    if (this.inputFromParent=='note'){this.pvSoutenance="active";}
    if (this.inputFromParent=='des-com-pfe'){this.desComPfe="active";}
    if (this.inputFromParent=='d-com-pfe'){this.dossier="active";}
    if (this.inputFromParent=='register'){this.registerEtudiant="active";}
    if (this.inputFromParent=='register-prof'){this.registerProf="active";}
    if (this.inputFromParent=='article'){this.article="active";}
    if (this.inputFromParent=='memoire-fini'){this.memoireFini="active";}
    if (this.inputFromParent=='creer-rapport'){this.creerRapport="active";}
    if (this.inputFromParent=='form-rapport'){this.creerRapport="active";}
    if (this.inputFromParent=='gestion-etudiants'){this.gestionEtudiants="active";}
    if (this.inputFromParent=='gestion-professeurs'){this.gestionProfesseurs="active";}
    if (this.inputFromParent=='memoire-etudiant-rapporteur'){this.rapporteur="active";}
    if (this.inputFromParent=='liste-etudiant-rapporteur'){this.rapporteur="active";}
    if (this.inputFromParent=='upload-pv'){this.uploadPv="active";}
    if (this.inputFromParent=='gestion-memoires-fini'){this.gestionMemoiresFini="active";}





    if(this.profil=='ETUDIANT'){
      this.authService.getEtudiant(this.idEtu).subscribe(data=>{
        this.masque=data;
        if(data.projet==null){
          this.afficheProjet=false
        }
        if(data.projet.memoire==null){
          this.afficheMemoire=false
        }
        if(data.projet.certificat==null){
          this.afficheCertificat=false
        }
        if(data.projet.demandeAutorisation==null){
          this.afficheDemande=false
        }
      })
    }
   
  }

  
}
