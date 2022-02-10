import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-creer-projet',
  templateUrl: './creer-projet.component.html'
})
export class CreerProjetComponent implements OnInit {
  inputText: string = 'resp-form';
  ProjetForm: FormGroup;
  profil = sessionStorage.getItem("profil");
  allProfs: any;
  idEtudiant= sessionStorage.getItem("idEtu") as string;
  submitted = false;
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  get f() {
    return this.ProjetForm.controls;
  }

  get value() {
    return this.ProjetForm.controls;
  }

  ngOnInit(): void {
    console.log(this.idEtudiant)
    this.ProjetForm = this.formBulder.group(
      {
        sujet: ['', Validators.required],
        description: ['',Validators.required],
      });

    this.authService.getProfs().subscribe(data => {
      this.allProfs = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.ProjetForm.invalid) {
      console.log("invalid form")

    } else {
    
        this.authService
          .FormulaireProjet(
            this.ProjetForm.value.sujet,
            this.ProjetForm.value.description,
            this.idEtudiant
           
          )
          .subscribe(
            (resultat) => {
              this.alertGood();
              console.log({ resultat: resultat });
              this.submitted = false;
              this.ProjetForm.reset();
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
        title: 'Projet Créé avec succès',
        showConfirmButton: false,
        timer: 1500
      })
    }
    alertBad(){
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Echec de la création de projet !'
      })
    }
  }


