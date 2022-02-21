import { AfterViewInit, Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MustMatch } from '../../services/_helpers/must-match.validator';
import { style } from '@angular/animations';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';

@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html'
})
export class RegisterProfComponent implements OnInit {
  inputText='register-prof';
  RegisterForm: FormGroup;
  emails:any;
  submitted = false;
  returnUrl: string;
  hide = true;
  compte:any;
  numTel:string;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
      this.RegisterForm = this.formBulder.group(
        {
          specialite: ['', Validators.required],
          indicatif:['', Validators.required],
          numTel: ['', [Validators.required, Validators.pattern("[0-9][0-9][0-9][0-9][0-9][0-9][0-9]")]],
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          email: ['', [Validators.email, Validators.required]],
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
            this.numTel=this.RegisterForm.value.indicatif+''+this.RegisterForm.value.numTel;
            this.authService.verifEmail(this.RegisterForm.value.email).subscribe(
              (data)=>{
                this.compte=data;
                if(this.compte!==null){
                this.alertBadEmail();
              this.f['email'].reset()}
              else{
                this.authService
                .RegisterProf(
                  this.RegisterForm.value.specialite,
                  this.numTel,
                  this.RegisterForm.value.nom,
                  this.RegisterForm.value.prenom,
                  'PROF',
                  this.RegisterForm.value.email,
                  this.RegisterForm.value.password
                )
                .subscribe(
                  (resultat) => {
                    this.submitted = false;
                    this.RegisterForm.reset();
                    this.alertGood();
                  },
                  (error) => {
                    console.log(error);
                  this.alertBad();
                  }
                );
              }
            },
            (error)=>{
              this.authService
                .RegisterProf(
                  this.RegisterForm.value.specialite,
                  this.numTel,
                  this.RegisterForm.value.nom,
                  this.RegisterForm.value.prenom,
                  'PROF',
                  this.RegisterForm.value.email,
                  this.RegisterForm.value.password
                )
                .subscribe(
                  (resultat) => {
                    this.submitted = false;
                    this.RegisterForm.reset();
                    this.alertGood();
                  },
                  (error) => {
                    console.log(error);
                  this.alertBad();
                  }
                );
          
            })
    }
    

    
  }
  Reset(){
    this.submitted=false;
    this.RegisterForm.reset();
  }

  alertBadEmail(){
    Swal.fire({
      icon: 'error',
      title: 'Email déja utilisé !',
      
    })
  }
  alertGood(){
    Swal.fire({
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
