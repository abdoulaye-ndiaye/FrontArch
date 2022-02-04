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
  projet:any;
  ajoutRapporteurForm : FormGroup;
  submitted = false;
  returnUrl : string;
  message = '';
  hide = true;
  id: string;
  idProf: string;
  rapporteurs:any;

  constructor(
    private formBulder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
  ) { }
  get value() {
    return this.ajoutRapporteurForm.controls;
  };

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      retrieve: true,
    };


    this.ajoutRapporteurForm = this.formBulder.group(
      {
        idProf: [''],
      });
    
    this.route.queryParamMap
    .subscribe(params => { 
      this.id = params.get('id') as string;
    }) ;

    this.authService.listeProfesseur().subscribe(data => {
      this.allProfesseurs = data;
      this.dtTrigger.next(data);
    }) ;

    this.authService.getProjet(this.id).subscribe(data => {
      this.projet = data;
      this.rapporteurs=this.projet.rapporteur;
      console.log(this.rapporteurs)
      
    });
    
}

    onSubmit(idProf:string) {
      this.submitted =true;   
     
        this.authService.ajoutRapporteur(idProf, this.id)
        .subscribe(
          results=>{
            console.log(results)
          }
        )
        this.refresh()
      }
    
      refresh(): void {
        window.location.reload();
    }
}
