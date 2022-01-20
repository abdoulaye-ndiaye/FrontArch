import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajout-rapporteur',
  templateUrl: './ajout-rapporteur.component.html'
})
export class AjoutRapporteurComponent implements OnInit {

  profil = sessionStorage.getItem("profil");

  constructor() { }

  ngOnInit(): void {
  }

}
