import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html'
})
export class JuryComponent implements OnInit {
  inputText: string = 'jury';
  
  profil = sessionStorage.getItem("profil");
  allProfesseurs:any;
  projet:any;
  ajoutMembresJuryForm : FormGroup;
  submitted = false;
  returnUrl : string;
  message = '';
  hide = true;
  id: string;
  idProf: string;
  membresJury:any;
  idJury:string;

  constructor(
    private formBulder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
  ) { }
  get value() {
    return this.ajoutMembresJuryForm.controls;
  };

  ngOnInit(): void {
    
    this.ajoutMembresJuryForm = this.formBulder.group(
      {
        idProf: [''],
      });
    
    this.route.queryParamMap
    .subscribe(params => { 
      this.id = params.get('id') as string;
    }) ;

    this.authService.listeProfesseur().subscribe(data => {
      this.allProfesseurs = data;
      console.log(data)
      setTimeout(() => {
        $('#professeurs').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    }) ;

    this.authService.getProjet(this.id).subscribe(data => {
      this.projet = data;
      console.log(data)
      this.idJury= data.projet.jury._id;
      this.membresJury=this.projet.jury.membres;
      console.log(this.membresJury)
      setTimeout(() => {
        $('#membresJury').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
      
    });
    
}

    onSubmit(idProf:string) {
      this.submitted =true;   
     
        this.authService.ajoutMembreJury(idProf, this.idJury)
        .subscribe(
          results=>{
            console.log(results)
            this.alertGood1();
            this.refresh();
          }
        )
       
      }
      suppression(idProf:string){
        this.authService.supprimerMembreJury(idProf, this.idJury)
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
        title: 'Membre du jury ajouté !',
        showConfirmButton: false,
        timer: 1500
      })
    }
    alertGood2(){
      Swal.fire({
        icon: 'success',
        title: 'Membre du jury supprimé !',
        showConfirmButton: false,
        timer: 1500
      })
    }
}
