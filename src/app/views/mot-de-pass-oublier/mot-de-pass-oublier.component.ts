import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MustMatch } from '../../services/_helpers/must-match.validator';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-mot-de-pass-oublier',
  templateUrl: './mot-de-pass-oublier.component.html'
})
export class MotDePassOublierComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  token:any;
  idCompte: string;
  email: string;

  message = '';
  hide = true;
  constructor(
    private authService: AuthService,
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe(params => {
      this.token = params.get('token') as string;
    }) ;

    const tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    this.email = tokenInfo.email; // get email
    this.idCompte= tokenInfo._id;
    console.log(tokenInfo); // show decoded token object in console

    this.loginForm = this.formBulder.group(
      {
        password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
        confirmPassword: ['', Validators.required],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );


  }

  get f() { return this.loginForm.controls; }

  get value() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      console.log("invalid form")
    } else {

        this.authService.changerPassword(this.idCompte,this.loginForm.value.password)
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
  alertGood(){
    Swal.fire({
      icon: 'success',
      title: 'Mot de passe modifié !',
      showConfirmButton: false,
      timer: 1100
      
    })
  }
  alertBad(){
    Swal.fire({
      icon: 'error',
      title: 'Erreur...',
      text: 'Echec de la modification'
    })
  }
}
