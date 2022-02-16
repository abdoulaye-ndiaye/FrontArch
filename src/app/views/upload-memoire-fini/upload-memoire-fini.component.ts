import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload-memoire-fini/upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-upload-memoire-fini',
  templateUrl: './upload-memoire-fini.component.html'
})
export class UploadMemoireFiniComponent implements OnInit {
  inputText: string = 'memoire-fini';
  b = false;
  uploadArticleForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
  hide = true;
  idProf=sessionStorage.getItem('idProf') as string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) {
  }

  ngOnInit(): void {
    this.uploadArticleForm = this.formBuilder.group({
      image: [null, Validators.required],
      sujet: ['', Validators.required],
      description: ['',Validators.required],
      etudiant: ['', Validators.required],
      encadreur: ['',Validators.required],
    });
  }

  get value() {
    return this.uploadArticleForm.controls;
  }
  get f(){
    return this.uploadArticleForm.controls;
  }

  // Onchange
  onChange(event: any) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.patientForm.get('uploadImg').setValue(file);
    // }
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
    if (this.uploadArticleForm.invalid) {
      console.log("form invalid");
      return;
    } 
    else {
      if (this.fileSelected) {
        this.wait();
        const body = new FormData();
        body.append('fichier', this.fileSelected, this.fileSelected.name);
        body.append('idProf', this.idProf);
        body.append('sujet', this.uploadArticleForm.value.sujet);
        body.append('description', this.uploadArticleForm.value.description);
        body.append('etudiant', this.uploadArticleForm.value.etudiant);
        body.append('encadreur', this.uploadArticleForm.value.encadreur);

        this.uploadService.upload(body).subscribe(
          (result) => {
            Swal.close();
            this.refresh();
            this.alertGood();
          },
          (error) => {
            Swal.close();
            this.uploadArticleForm.reset();
            this.alertEchec();
          }
        );
      } 
      else {
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
  alertEchec(){
    Swal.fire({
      icon: 'error',
      title: 'Erreur...',
      text: "Echec de l'upload !"
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
