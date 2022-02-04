import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadService: UploadService,
  ) {
    const etudiant = sessionStorage.getItem("id");
  }


  ngOnInit(): void {

    this.uploadDemandeAutorisationForm = this.formBuilder.group({
      image: [null],
      hide: ['rien']
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
      console.log("Erreur d'upload")
      return;
    } else {
      if (this.fileSelected) {
        const body = new FormData();
        body.append('fichier', this.fileSelected, this.fileSelected.name)
        body.append('idProj', '603c100c99ca52503893c721');
        this.uploadService.upload(body).subscribe(result => {
          console.log(result);
          this.message = "Upload Réussie !";
        }, error => {

        });
      } else {
        console.log("Rien ne va !")
      }
    }
  }

  refresh(): void {
    window.location.reload();

  }

}
