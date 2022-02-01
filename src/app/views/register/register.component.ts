import { AfterViewInit, Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MustMatch } from '../../services/_helpers/must-match.validator';
import { style } from '@angular/animations';

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
  message = '';
  hide = true;
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
   
      this.RegisterForm = this.formBulder.group(
        {
          profil: ['', Validators.required],
          classe: [''],
          specialite: [''],
          dateNaissance: [''],
          lieuNaissance: [''],
          numTel: ['', [Validators.required, Validators.maxLength(9)]],
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        { validator: MustMatch('password', 'confirmPassword') }
      );
   
  }

  refresh(): void {
    window.location.reload();
}

  ngAfterViewInit() {
    //script
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
      return console.log("invalid");
    } else {
      console.log(
        this.RegisterForm.value.email,
        this.RegisterForm.value.password
      );
      this.RegisterForm.value.profil= this.profil;
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
            this.RegisterForm.value.password
          )
          .subscribe(
            (resultat) => {
              console.log({ resultat: resultat });
              this.submitted = false;
              this.router.navigate(['/login']);
            },
            (error) => {
              console.log(error);
              this.message = 'email ou mot de passe incorrect';
            }
          );
        alert('inscription etudiant reussie');
      } else {
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
              console.log({ resultat: resultat });
              this.submitted = false;
              this.router.navigate(['/login']);
            },
            (error) => {
              console.log(error);
              this.message = 'email ou mot de passe incorrect';
            }
          );
        alert('inscription professeur reussie');
      }
    }
  }
  onReset() {
    this.submitted = false;
    this.RegisterForm.reset();
  }

  onChangeProfil(event: any) {
    console.log(event.target.value);
    this.profil = event.target.value;
  }
}
