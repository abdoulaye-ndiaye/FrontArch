import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';

@Component({
  selector: 'app-modif-projet',
  templateUrl: './modif-projet.component.html'
})
export class ModifProjetComponent implements OnInit {
  inputText: string = 'projet';
  ModifProjetForm: FormGroup;
  profil = sessionStorage.getItem("profil");
  allProfs: any;
  etat:string;
  projet:any;
  idEtudiant= sessionStorage.getItem("idEtu") as string;
  submitted = false;
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  get f() {
    return this.ModifProjetForm.controls;
  }

  get value() {
    return this.ModifProjetForm.controls;
  }

  ngOnInit(): void {
    this.ModifProjetForm = this.formBulder.group(
      {
        sujet: ['', Validators.required],
        description: ['',Validators.required],
      });
      this.authService.getProjetByIdEtudiant(this.idEtudiant).subscribe(data=>{
        this.projet=data;
      })
  }

  onSubmit() {
    this.submitted = true;
    this.etat="en cours de traitement";
    
    if (this.ModifProjetForm.invalid) {
      console.log("invalid form")

    } else {
    
        this.authService
          .updateProjet(
            this.projet._id,
            this.ModifProjetForm.value.sujet,
            this.ModifProjetForm.value.description,
          )
          .subscribe(
            (resultat) => {
              this.alertGood();
              console.log({ resultat: resultat });
              this.submitted = false;
              this.ModifProjetForm.reset();
              this.router.navigate(['/projet']);
            },
            (error) => {
              console.log(error);
              this.alertBad();
            }
          );
        
      } 
    }
    alertGood(){
      Swal.fire({
        icon: 'success',
        title: 'Projet modifié avec succès',
        showConfirmButton: false,
        timer: 1500
      })
    }
    alertBad(){
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Echec de la modification du projet !'
      })
    }
}
