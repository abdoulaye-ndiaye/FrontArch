import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { UploadService } from '../../services/upload-rapport/upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-rapport',
  templateUrl: './upload-rapport.component.html'
})
export class UploadRapportComponent implements OnInit {
  inputText: string = 'upload-rapport';
  b = false;
  uploadRapportForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
  message = '';
  hide = true;
  profil = sessionStorage.getItem("profil");
  idProj:string;
  idEtu:string;
  allProjets:any;
  idProf= sessionStorage.getItem('idProf') as string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadService: UploadService,
  ) { 
  }

  ngOnInit(): void {

    this.uploadRapportForm = this.formBuilder.group({
      image: [null],
      etudiant:['', Validators.required]
    })
   
    this.authService.getProjets2().subscribe(data=>{
      this.allProjets=data;
    })

  }

  get value() {
    return this.uploadRapportForm.controls;
  }
  get f() {
    return this.uploadRapportForm.controls;
  }


  onChangeProjet(event: any) {
    this.idProj = event.target.value;
    console.log(this.idProj)
  }
  // Onchange
  onChange(event: any) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.patientForm.get('uploadImg').setValue(file);
    // }
    console.log("commence ici");
    if (event.target.files[0]) {
      this.fileSelected = event.target.files[0] as File;
      const reader = new FileReader();
      reader.readAsDataURL(this.fileSelected);
      reader.onload = (event: any) => {
        this.imageUrl = reader.result;
        //console.log(this.imageUrl)
      };
    }
  }

  envoyer() {
    this.submitted = true;
    console.log("Bienvenue")
    if (this.uploadRapportForm.invalid) {
      return;
    } else {
      if (this.fileSelected) {
        this.wait();
        const body = new FormData();
        body.append('fichier', this.fileSelected, 'Rapport')
        body.append('idProj', this.idProj);
        this.uploadService.upload(body).subscribe(result => {
          Swal.close();
          this.alertGood();
          this.submitted=false;
          this.uploadRapportForm.reset();
        }, error => {
          console.log(error);
        });
      } else {
        this.alertBad();
      }
    }
  }

  refresh(): void {
    window.location.reload();

  }
  alertGood(){
    Swal.fire({
      icon: 'success',
      title: 'Upload réussi !',
      showConfirmButton: false,
      timer: 1000
    })
  }
  alertBad(){
    Swal.fire({
      icon: 'error',
      title: 'Erreur...',
      text: 'Aucun Fichier choisi !'
    })
  }
  wait(){
    Swal.fire({
      icon: 'info',
      title: 'Upload en cours !'
    });
    Swal.showLoading();
  }

}
