import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';

@Component({
  selector: 'app-encadreurs',
  templateUrl: './encadreurs.component.html'
})
export class EncadreursComponent implements OnInit {
  inputText: string = 'encadreurs';
 

  profil = sessionStorage.getItem("profil");
  allProfesseurs:any[];
  projet:any;
  ajoutEncadreurForm : FormGroup;
  submitted = false;
  returnUrl : string;
  message = '';
  idEtu:string;
  hide = true;
  idProjet: string;
  idProf: string;
  encadreurs:any;

  constructor(
    private formBulder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
  ) { }
  get value() {
    return this.ajoutEncadreurForm.controls;
  };

  ngOnInit(): void {
    
    this.idEtu= sessionStorage.getItem("idEtu") as string;
    this.ajoutEncadreurForm = this.formBulder.group(
      {
        idProf: [''],
      }); 
      this.authService.getProjetByIdEtudiant(this.idEtu).subscribe(data=>{
        this.idProjet=data._id;

        this.authService.getProjet(this.idProjet).subscribe(data => {
          this.projet = data;
          this.encadreurs=this.projet.encadreur;
          setTimeout(() => {
            $('#encadreurs').DataTable({
              pagingType: 'full_numbers',
              pageLength: 5,
              processing: true,
              lengthMenu: [5, 10, 25],
            });
          }, 1);
          console.log(this.encadreurs)
          
        });
      })

      

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
    }) ;

   
    
}

    onSubmit(idProf:string) {
      this.submitted =true;   
     
        this.authService.ajoutEncadreur(idProf, this.idProjet)
        .subscribe(
          results=>{
            console.log(results)
            this.alertGood1();
            this.refresh();
          }
        )
       
      }
      suppression(idProf:string){
        this.authService.supprimerEncadreur(idProf, this.idProjet)
        .subscribe(
          results=>{
            console.log(results)
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
        title: 'Encadreur ajouté !',
        showConfirmButton: false,
        timer: 1500
      })
    }
    alertGood2(){
      Swal.fire({
        icon: 'success',
        title: 'Encadreur supprimé !',
        showConfirmButton: false,
        timer: 1500
      })
    }
}
