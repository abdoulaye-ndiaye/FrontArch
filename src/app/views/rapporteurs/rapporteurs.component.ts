import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-rapporteurs',
  templateUrl: './rapporteurs.component.html'
})
export class RapporteursComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  profil = sessionStorage.getItem("profil");
  allProfesseurs:any;
  rapporteurs:any;
  ajoutRapporteurForm : FormGroup;
  submitted = false;
  returnUrl : string;
  message = '';
  hide = true;
  id: string;
  idProf: string;

  constructor(
    private formBulder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
    
    this.authService.listeProfesseur().subscribe(data => {
      this.allProfesseurs = data;
      console.log(this.allProfesseurs);
    }) ;

    this.route.queryParamMap
    .subscribe(params => {
      console.log(params); 

      this.id = params.get('id') as string;
      localStorage.setItem("id",this.id);
      console.log(this.id); 
      this.idProf = params.get('idProf') as string;
      console.log(this.idProf); 
  }) ;
  this.id=localStorage.getItem("id") as string;
  this.authService.getRapporteur(this.id).subscribe(data => {
    this.rapporteurs = data;
    console.log(this.rapporteurs);

  }) ;
    }
    
    refresh(): void {
      window.location.reload();
  }
    onSubmit(idProf:string) {
      this.submitted =true;    
        this.authService.ajoutRapporteur(idProf, this.id)
        .subscribe(
          results=>{
            console.log(results)
          }
        )
      }

}
