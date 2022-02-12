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


  home="";ajoutRapporteur="";excelEtudiant="";excelProf="";projet="";rapporteurs="";respForm="";
  uploadAutorisation="";demandeAutorisation="";uploadMemoire="";uploadRapport="";changerPassword="";
  dossier="";memoire="";pv="";encadreur="";jury="";

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
    if (this.inputFromParent=='upload-autorisation'){this.uploadAutorisation="active";}
    if (this.inputFromParent=='demande-autorisation'){this.demandeAutorisation="active";}
    if (this.inputFromParent=='upload-memoire'){this.uploadMemoire="active";}
    if (this.inputFromParent=='upload-rapport'){this.uploadRapport="active";}
    if (this.inputFromParent=='changer-password'){this.home="active";}
    if (this.inputFromParent=='dossier'){this.dossier="active";}
    if (this.inputFromParent=='memoire'){this.dossier="active";}
    if (this.inputFromParent=='pv'){this.dossier="active";}
    if (this.inputFromParent=='autorisation'){this.dossier="active";}
    if (this.inputFromParent=='rapport'){this.dossier="active";}
    if (this.inputFromParent=='encadreurs'){this.encadreur="active";}
    if (this.inputFromParent=='creer-jury'){this.dossier="active";}
    if (this.inputFromParent=='jury'){this.dossier="active";}
    if (this.inputFromParent=='liste-projets'){this.dossier="active";}


    this.authService.getEtudiant(this.idEtu).subscribe(data=>{
      if(data.projet==null){
        this.afficheProjet=false
      }
    })
  }

  
}
