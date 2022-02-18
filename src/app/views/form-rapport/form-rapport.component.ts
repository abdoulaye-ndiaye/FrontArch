import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';

@Component({
  selector: 'app-form-rapport',
  templateUrl: './form-rapport.component.html',
})
export class FormRapportComponent implements OnInit {
  inputText: string = 'form-rapport';
  resume: any;
  fond: any;
  forme: any;
  conclusion: any;
  idEtudiant: string;
  RapportForm: FormGroup;
  profil = sessionStorage.getItem("profil");
  allProjets: any;
  idProf= sessionStorage.getItem("idProf") as string;
  submitted = false;
  test=false;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  get f() {
    return this.RapportForm.controls;
  }

  get value() {
    return this.RapportForm.controls;
  }

  ngOnInit(): void {
    this.RapportForm = this.formBulder.group(
      {
        resume: ['', Validators.required],
        remarqueFond: ['',Validators.required],
        remarqueForme: ['', Validators.required],
        conclusion: ['',Validators.required],
        etudiant: ['', Validators.required]
      });

      this.authService.getProjets2().subscribe(data=>{
        this.allProjets=data;
        console.log(data)
      })
  }

  onSubmit() {
    this.submitted = true;

    if(this.RapportForm.invalid){
      console.log('form invalid');
    }
    else{
      this.test=true;
      this.resume= this.RapportForm.value.resume;
      this.fond= this.RapportForm.value.remarqueFond;
      this.forme= this.RapportForm.value.remarqueForme;
      this.conclusion= this.RapportForm.value.conclusion;
      this.idEtudiant= this.RapportForm.value.etudiant;
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
