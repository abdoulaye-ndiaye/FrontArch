import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  inputText: string = 'home';
  compte: any;
  a: string;
  dateNaissance: string;
  lieuNaissance: string;
  classe: string;
  specialite: string;
  profil = sessionStorage.getItem("profil");
  nbmemoire:number;
  nbarticle:number;
  nbcompte:number;
  nbfichier:number;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {

    this.a = sessionStorage.getItem("id") as string;
    this.dateNaissance = sessionStorage.getItem("dateNaissance") as string;
    this.lieuNaissance = sessionStorage.getItem("lieuNaissance") as string;
    this.classe = sessionStorage.getItem("classe") as string;
    this.specialite = sessionStorage.getItem("specialite") as string;

    this.authService.getCompte(this.a).subscribe(data => {
      this.compte = data;

    });

    this.authService.getMemoiresFinis().subscribe(data => {
      this.nbmemoire=data.length;
      this.nbfichier=data.length;
    });

    this.authService.getArticles().subscribe(data => {
      this.nbarticle= data.length;
      this.nbfichier += data.length;
    });

    this.authService.getComptes().subscribe(data => {
      this.nbcompte= data.length;
    });

    
  }

}
