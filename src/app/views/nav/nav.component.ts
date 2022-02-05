import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Input() inputFromParent : string;
  profil = sessionStorage.getItem("profil");
  home="";ajoutRapporteur="";downloadAutorisation="";downloadDemandeAutorisation="";downloadMemoire="";
  downloadRapport="";excelEtudiant="";excelProf="";projet="";rapporteurs="";respForm="";
  uploadAutorisation="";uploadDemandeAutorisation="";uploadMemoire="";uploadRapport="";

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.test();
  }
  test(){
    if (this.inputFromParent=='home'){this.home="active";}
    if (this.inputFromParent=='ajout-rapporteur'){this.ajoutRapporteur="active";}
    if (this.inputFromParent=='download-autorisation'){this.downloadAutorisation="active";}
    if (this.inputFromParent=='download-demande-autorisation'){this.downloadDemandeAutorisation="active";}
    if (this.inputFromParent=='download-memoire'){this.downloadMemoire="active";}
    if (this.inputFromParent=='download-rapport'){this.downloadRapport="active";}
    if (this.inputFromParent=='excel-etudiant'){this.excelEtudiant="active";}
    if (this.inputFromParent=='excel-prof'){this.excelProf="active";}
    if (this.inputFromParent=='projet'){this.projet="active";}
    if (this.inputFromParent=='rapporteurs'){this.rapporteurs="active";}
    if (this.inputFromParent=='resp-form'){this.respForm="active";}
    if (this.inputFromParent=='upload-autorisation'){this.uploadAutorisation="active";}
    if (this.inputFromParent=='upload-demande-autorisation'){this.uploadDemandeAutorisation="active";}
    if (this.inputFromParent=='upload-memoire'){this.uploadMemoire="active";}
    if (this.inputFromParent=='upload-rapport'){this.uploadRapport="active";}

  }

}