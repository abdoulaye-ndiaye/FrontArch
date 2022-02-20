import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { UploadService } from '../../services/upload-demande-autorisation/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-upload-demande-autorisation',
  templateUrl: './upload-demande-autorisation.component.html'
})
export class UploadDemandeAutorisationComponent implements OnInit {

  inputText: string = 'upload-demande-autorisation';
  b = false;
  uploadDemandeAutorisationForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
  message = '';
  hide = true;
  profil = sessionStorage.getItem("profil");
  idProj:string;
  idEtu:string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadService: UploadService,
  ) {
  }


  ngOnInit(): void {

    this.uploadDemandeAutorisationForm = this.formBuilder.group({
      image: [null],
      hide: ['rien']
    })
    this.idEtu = sessionStorage.getItem('idEtu') as string;
  
    this.authService.getProjetByIdEtudiant(this.idEtu).subscribe(data=>{
      this.idProj=data._id;
    })


  }

  get value() {
    return this.uploadDemandeAutorisationForm.controls;
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
    if (this.uploadDemandeAutorisationForm.invalid) {
      this.alertBad();
      return;
    } else {
      if (this.fileSelected) {
        this.wait();
        const body = new FormData();
        body.append('fichier', this.fileSelected, this.fileSelected.name)
        body.append('idProj', this.idProj);
        this.uploadService.upload(body).subscribe(result => {
          Swal.close();
          this.alertGood();
          this.router.navigate(['home'])
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
      timer: 1300
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
