import { AfterViewInit, Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MustMatch } from '../../services/_helpers/must-match.validator';
import { style } from '@angular/animations';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export enum EnumProfil {
  ETUDIANT = 'ETUDIANT',
  PROF = 'PROF',
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  a = '';
  profil = EnumProfil.ETUDIANT;

  submitted = false;
  returnUrl: string;
  hide = true;
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    if(this.profil=='ETUDIANT'){
      this.RegisterForm = this.formBulder.group(
        {
          profil: ['', Validators.required],
          classe: [''],
          code:[''],
          dateNaissance: [''],
          lieuNaissance: [''],
          numTel: ['', [Validators.required, Validators.minLength(9),  Validators.maxLength(9)]],
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          email: ['', [Validators.email, Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        { validator: MustMatch('password', 'confirmPassword') }
      );
     }
     else if(this.profil=='PROF'){
      this.RegisterForm = this.formBulder.group(
        {
          profil: ['', Validators.required],
          specialite: [''],
          numTel: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          email: ['', [Validators.email, Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        { validator: MustMatch('password', 'confirmPassword') }
      );
     }
    
   
  }

  refresh(): void {
    window.location.reload();
}

  ngAfterViewInit() {
   
  }

  get f() {
    return this.RegisterForm.controls;
  }

  get value() {
    return this.RegisterForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.RegisterForm.invalid) {
      console.log("invalid form")
    } 
    else {
      
      if (this.RegisterForm.value.profil == EnumProfil.ETUDIANT) {

        this.authService
          .RegisterEtudiant(
            this.RegisterForm.value.classe,
            this.RegisterForm.value.dateNaissance,
            this.RegisterForm.value.lieuNaissance,
            this.RegisterForm.value.numTel,
            this.RegisterForm.value.nom,
            this.RegisterForm.value.prenom,
            EnumProfil.ETUDIANT,
            this.RegisterForm.value.email,
            this.RegisterForm.value.code,
            this.RegisterForm.value.password
          )
          .subscribe(
            (resultat) => {
              this.submitted = false;
              this.router.navigate(['/login']);
            },
            (error) => {
              console.log(error);
            this.alertBad();
            }
          );
        this.alertGood();
      } 
      else if(this.RegisterForm.value.profil == EnumProfil.PROF) {
        this.authService
          .RegisterProf(
            this.RegisterForm.value.specialite,
            this.RegisterForm.value.numTel,
            this.RegisterForm.value.nom,
            this.RegisterForm.value.prenom,
            EnumProfil.PROF,
            this.RegisterForm.value.email,
            this.RegisterForm.value.password
          )
          .subscribe(
            (resultat) => {
              this.submitted = false;
              this.router.navigate(['/login']);
            },
            (error) => {
              console.log(error);
              this.alertBad();
            }
          );
        this.alertGood();
      }
    }
  }
  onReset() {
    this.submitted = false;
    this.RegisterForm.reset();
  }

  onChangeProfil(event: any) {
    this.profil = event.target.value;
  }
  alertGood(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Inscription Réussie !',
      showConfirmButton: false,
      timer: 1200
      
    })
  }
  alertBad(){
    Swal.fire({
      icon: 'error',
      title: 'Erreur...',
      text: 'Echec inscription'
    })
  }
}
