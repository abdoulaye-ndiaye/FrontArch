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
  encadreurs: any;
  rapporteurs:any;
  b: string;
  show=true;
  etudiant:any;
  profil = sessionStorage.getItem("profil");

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }




  ngOnInit(): void {
    this.b = sessionStorage.getItem("idEtu") as string;

    this.authService.getProjetByIdEtudiant(this.b).subscribe(data => {
      this.encadreurs=data.encadreur;
      this.rapporteurs=data.rapporteur;
      this.projet = data;
      console.log(data)
      sessionStorage.setItem('idProjet',data._id); 

    });
    this.authService.getEtudiant(this.b).subscribe(data=>{
      this.etudiant=data;
      if(data.projet==null){
        this.show=false;
      }
      else if(data.projet){
        if(data.projet.jury==null){
          this.show=false
        }
      }
    })

  }
  

}
