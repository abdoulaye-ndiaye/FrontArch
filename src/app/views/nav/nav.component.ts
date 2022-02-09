import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Input() inputFromParent : string;
  profil = sessionStorage.getItem("profil");
  specialite = sessionStorage.getItem("specialite");

  home="";ajoutRapporteur="";excelEtudiant="";excelProf="";projet="";rapporteurs="";respForm="";
  uploadAutorisation="";uploadDemandeAutorisation="";uploadMemoire="";uploadRapport="";changerPassword="";
  dossier="";memoire="";pv="";

  constructor(
    private router: Router,
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
    if (this.inputFromParent=='rapporteurs'){this.rapporteurs="active";}
    if (this.inputFromParent=='resp-form'){this.respForm="active";}
    if (this.inputFromParent=='upload-autorisation'){this.uploadAutorisation="active";}
    if (this.inputFromParent=='upload-demande-autorisation'){this.uploadDemandeAutorisation="active";}
    if (this.inputFromParent=='upload-memoire'){this.uploadMemoire="active";}
    if (this.inputFromParent=='upload-rapport'){this.uploadRapport="active";}
    if (this.inputFromParent=='changer-password'){this.home="active";}
    if (this.inputFromParent=='dossier'){this.dossier="active";}
    if (this.inputFromParent=='memoire'){this.dossier="active";}
    if (this.inputFromParent=='pv'){this.dossier="active";}
    if (this.inputFromParent=='autorisation'){this.dossier="active";}
    if (this.inputFromParent=='rapport'){this.dossier="active";}

  }

}
