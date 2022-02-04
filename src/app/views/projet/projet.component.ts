import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html'
})
export class ProjetComponent implements OnInit {
  inputText: string = 'projet';
  projet: any;
  encadreur: any;
  b: string;
  //c = sessionStorage.getItem("idProjet") as string;
  profil = sessionStorage.getItem("profil");

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }




  ngOnInit(): void {
    this.b = sessionStorage.getItem("idEtu") as string;

    this.authService.getProjetByIdEtudiant(this.b).subscribe(data => {
      console.log(data);
      this.projet = data;

    });

  }

}
