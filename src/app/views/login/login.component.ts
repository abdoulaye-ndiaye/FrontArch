import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

import Swal from 'sweetalert2/dist/sweetalert2.js';


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
  }

  get f() { return this.loginForm.controls; }

  get value() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        result => {
          if (result.code) {
            this.message = 'Email et/ou mot de passe incorrect !';
          } else {
            let tokenStr = "Bearer " + result.token;
            sessionStorage.setItem("token", tokenStr);
            sessionStorage.setItem("profil", result.profil);
            sessionStorage.setItem("id", result.id);
            sessionStorage.setItem("email", result.email);
            this.alert();
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
          this.message = 'Email et/ou mot de passe incorrect !';
        }
      );

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
  
}

