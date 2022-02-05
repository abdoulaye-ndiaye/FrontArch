import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from '../../services/_helpers/must-match.validator';


@Component({
  selector: 'app-changer-password',
  templateUrl: './changer-password.component.html'
})
export class ChangerPasswordComponent implements OnInit {
  inputText: string = 'changer-password';
  submitted = false;
  changerPasswordForm: FormGroup;


  constructor(
    private authService: AuthService,
    private formBulder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.changerPasswordForm = this.formBulder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirm: ['', Validators.required]
    },
    { validator: MustMatch('password', 'confirmPassword') })
  }

  get f() { return this.changerPasswordForm.controls; }

  get value() {
    return this.changerPasswordForm.controls;
  }
  onSubmit(){

  }

}
