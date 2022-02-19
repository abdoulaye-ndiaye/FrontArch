import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  message = '';
  hide = true;
  constructor(
    private authService: AuthService,
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.loginForm = this.formBulder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    console.log(this.loginForm.value.email)
  }

  get f() { return this.loginForm.controls; }

  get value() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.message='';
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        result => {
            this.alert();
            this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          if(error.error.text=='compte bloqué'){
            this.message= 'Ce compte a été bloqué';
          }
          else if(error.error.text=='email invalide'){
            this.message = 'Email et/ou mot de passe incorrect !';
          }
          else if(error.error.text=='mot de passe incorrect'){
            this.message= 'Email et/ou mot de passe incorrect !';
          }
          
        }
      );

    }
  }

  forgotPassword(){
    if (this.loginForm.value.email==''){
      this.alertBad();
    }
    else{
      Swal.fire({
        title: 'Etes-vous sûr?',
        text: "Un email vous sera envoyé pour la réinitialisation",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, envoyer !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.wait()
          this.authService.ForgotPassword(this.loginForm.value.email).subscribe(data=>{
            Swal.fire(
              'Envoyé!',
              'Email envoyé avec succès',
              'success'
            )
          })
        }
      })
     
    }
  }


  alert(){
    Swal.fire({
      icon: 'success',
      title: 'Login réussi !',
      showConfirmButton: false,
      timer: 1200
    })
  }
  alertGood(){
    Swal.fire({
      icon: 'success',
      title: 'Lien envoyé à votre email !',
      showConfirmButton: false,
      timer: 1600
    })
  }
  alertBad(){
    Swal.fire({
      icon: 'error',
      title: 'Erreur...',
      text: 'Veuillez renseignez votre email'
    })}
    wait(){
      Swal.fire({
        icon: 'info',
        title: 'Traitement en cours !'
      });
      Swal.showLoading();
    }

    confirmation(){
      Swal.fire({
        title: 'Etes-vous sûr?',
        text: "Un email vous sera envoyé pour la réinitialisation",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, envoyer !'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Envoyé!',
            'Email envoyé avec succès',
            'success'
          )
        }
      })
    }
  
}

