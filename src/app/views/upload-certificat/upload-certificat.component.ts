import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { UploadService } from '../../services/upload-certificat/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-upload-certificat',
  templateUrl: './upload-certificat.component.html'
})
export class UploadCertificatComponent implements OnInit {
  inputText: string = 'upload-certificat';
  b = false;
  uploadCertificatForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
 
  hide = true;
  profil = sessionStorage.getItem("profil");
  idProjet: string;
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
    this.idEtu= sessionStorage.getItem("idEtu") as string;

    this.uploadCertificatForm = this.formBuilder.group({
      image: [null],
      hide: ['rien']
    })

    this.authService.getProjetByIdEtudiant(this.idEtu).subscribe(data=>{
      this.idProjet=data._id;
    })
  }
    

  get value() {
    return this.uploadCertificatForm.controls;
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
  
    if (this.uploadCertificatForm.invalid) {
      this.alertBad();
      return;
    } else {
      if (this.fileSelected) {
        this.wait();
  
        const body = new FormData();
        body.append('fichier', this.fileSelected, this.fileSelected.name);
        body.append('idProj', this.idProjet);

        this.uploadService.upload(body).subscribe(
          (result) => {
            Swal.close();
            this.alertGood();
            this.uploadCertificatForm.reset();
          },
          (error) => {}
        );
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
