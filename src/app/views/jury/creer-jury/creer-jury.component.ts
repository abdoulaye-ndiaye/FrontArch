import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-creer-jury',
  templateUrl: './creer-jury.component.html'
})
export class CreerJuryComponent implements OnInit {
  inputText: string = 'creer-jury';
  JuryForm: FormGroup;
  allProfs: any;
  submitted = false;
  idJury:string;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  get f() {
    return this.JuryForm.controls;
  }

  get value() {
    return this.JuryForm.controls;
  }

  ngOnInit(): void {
    this.JuryForm = this.formBulder.group(
      {
        batiment: ['', Validators.required],
        salleSoutenance: ['',Validators.required],
        numJury: ['', Validators.required],
        membre1: [''],
        membre2: [''],
        membre3: [''],
      });
     

    this.authService.getProfs().subscribe(data => {
      this.allProfs = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.JuryForm.invalid) {
      console.log("invalid form")

    } else {
        this.authService
          .FormulaireJury(
            this.JuryForm.value.batiment,
            this.JuryForm.value.salleSoutenance,
            this.JuryForm.value.numJury
          )
          .subscribe(
            (resultat) => {
              this.alertGood();
              console.log({ resultat: resultat });
              this.idJury=resultat._id;
              this.submitted = false;
              this.JuryForm.reset();
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
        title: 'Jury Créé avec succès',
        showConfirmButton: false,
        timer: 1500
      })
    }
    alertBad(){
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Echec de la création du Jury !'
      })
    }
}
