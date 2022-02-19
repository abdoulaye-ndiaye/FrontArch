import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../services/_helpers/must-match.validator';


@Component({
  selector: 'app-changer-password',
  templateUrl: './changer-password.component.html'
})
export class ChangerPasswordComponent implements OnInit {
  inputText: string = 'changer-password';
  compte: any;
  a:any;
  changerPwdForm: FormGroup;
  submitted = false;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.changerPwdForm = this.formBulder.group(
      {
        password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
        confirmPassword: ['', Validators.required],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );
    this.a = sessionStorage.getItem("id") as string;

    this.authService.getCompte(this.a).subscribe(data => {
      this.compte = data;
    });

  }
  get f() {
    return this.changerPwdForm.controls;
  }

  get value() {
    return this.changerPwdForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.changerPwdForm.invalid) {
      console.log("invalid form")
    } else {
      Swal.fire({
        title: 'Etes-vous sûr ?',
        text: "Votre mot de passe va être modifié et vous serez déconnecté !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#63b521',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, modifier !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.wait()
          this.authService.changerPassword(this.a,this.changerPwdForm.value.password)
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
      })
       
      
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
  wait(){
    Swal.fire({
      icon: 'info',
      title: 'Traitement en cours !'
    });
    Swal.showLoading();
  }
}
