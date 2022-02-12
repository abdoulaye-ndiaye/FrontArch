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
  
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe(params => {
      console.log(params); 

      this.idEtudiant = params.get('idEtudiant') as string;
    }) ;
    this.authService.getEtudiant(this.idEtudiant).subscribe(data=>{
      this.etudiant=data;
    })

    this.authService.getProjetByIdEtudiant(this.idEtudiant).subscribe(data => {
      this.encadreurs=data.encadreur;
      this.rapporteurs=data.rapporteur;
      this.projet = data;
    });
    
    this.authService.getEtudiant(this.idEtudiant).subscribe(data=>{
      if(data.projet==null){
        this.afficher=false
      }
      if(data.projet.jury==null){
        this.show=false
      }
    })
  }

}
