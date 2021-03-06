import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html'
})
export class DossierComponent implements OnInit {
  inputText: string = 'dossier';

  idEtudiant:string;
  etudiant:any;
  projet:any;
  encadreurs:any;
  rapporteurs:any;
  afficher=true;
  show=true;
  test=true;
  voir=false;
  rapporteurs2:any;
  idProf=sessionStorage.getItem('idProf');
  specialite=sessionStorage.getItem('specialite') as string;
  profil= sessionStorage.getItem('profil') as string;
  
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe(params => {
      this.idEtudiant = params.get('idEtudiant') as string;
    }) ;
    this.authService.getEtudiant(this.idEtudiant).subscribe(data=>{
      this.etudiant=data;
      this.authService.getProjet(data.projet._id).subscribe(data2=>{
        this.rapporteurs2=data2.rapporteur;
        if(this.rapporteurs2.includes(this.idProf)){
          this.voir=true;
        }

      })
    })

    this.authService.getProjetByIdEtudiant(this.idEtudiant).subscribe(data => {
      this.encadreurs=data.encadreur;
      this.rapporteurs=data.rapporteur;
      this.projet = data;
    });
    
    this.authService.getEtudiant(this.idEtudiant).subscribe(data=>{
      if(data.projet==null){
        this.afficher=false
        this.show=false
        this.test=false
      }
      else if(data.projet){
        if(data.projet.jury==null){
          this.show=false
        }
        if(data.projet.note==null){
          this.test=false
        }
      }
    })
  }

}
