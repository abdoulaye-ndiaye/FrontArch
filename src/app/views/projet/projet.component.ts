import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html'
})
export class ProjetComponent implements OnInit {

  projet: any;
  encadreur: any;
  b: string;
  c: string;


  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }




  ngOnInit(): void {
    this.b = sessionStorage.getItem("idEtu") as string;

    this.authService.getProjetByIdEtudiant(this.b).subscribe(data => {
      this.c = data._id;
      this.projet = data;

    });


    this.authService.getEncadreur(this.c).subscribe(data => {
      this.encadreur = data;

    });
  }

}
