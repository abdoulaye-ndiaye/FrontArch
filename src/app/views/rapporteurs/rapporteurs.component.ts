import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-rapporteurs',
  templateUrl: './rapporteurs.component.html'
})
export class RapporteursComponent implements OnInit {
  inputText: string = 'rapporteurs';
 
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
  encadreurs:any;
  etudiant:any;

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

    this.ajoutRapporteurForm = this.formBulder.group(
      {
        idProf: [''],
      });
    
    this.route.queryParamMap
    .subscribe(params => { 
      this.id = params.get('idProjet') as string;
    }) ;

    this.authService.getProjet(this.id).subscribe(data => {
      this.projet = data;
      this.encadreurs=data.encadreur;
      this.rapporteurs=this.projet.rapporteur;
      this.etudiant=data.etudiant;
      this.authService.listeProfesseur().subscribe(data => {
        this.allProfesseurs = data;
        setTimeout(() => {
          $('#professeurs').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
          });
        }, 1);
        setTimeout(() => {
          $('#rapporteurs').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
          });
        }, 1); 
      }) ;
      
      
    });
   
    
}

    onSubmit(idProf:string) {
      this.submitted =true;   
     
        this.authService.ajoutRapporteur(idProf, this.id)
        .subscribe(
          results=>{
            this.alertGood1();
            this.refresh();
          }
        )
       
      }
      suppression(idProf:string){
        this.authService.supprimerRapporteur(idProf, this.id)
        .subscribe(
          results=>{
            this.alertGood2();
            this.refresh();
          }
        )
      }
    
      refresh(): void {
        window.location.reload();
    }
    alertGood1(){
      Swal.fire({
        icon: 'success',
        title: 'Rapporteur ajouté !',
        showConfirmButton: false,
        timer: 1500
      })
    }
    alertGood2(){
      Swal.fire({
        icon: 'success',
        title: 'Rapporteur supprimé !',
        showConfirmButton: false,
        timer: 1500
      })
    }
}
