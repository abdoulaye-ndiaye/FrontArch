import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload-memoire/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-memoire',
  templateUrl: './upload-memoire.component.html',
})
export class UploadMemoireComponent implements OnInit {
  inputText: string = 'upload-memoire';
  b = false;
  uploadMemoireForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
  messageBad = '';
  messageGood = '';
  hide = true;
  profil = sessionStorage.getItem('profil');
  idProj = sessionStorage.getItem('idProjet') as string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) {
    const etudiant = sessionStorage.getItem('id');
  }

  ngOnInit(): void {
    this.uploadMemoireForm = this.formBuilder.group({
      image: [null],
      hide: ['rien'],
    });
  }

  get value() {
    return this.uploadMemoireForm.controls;
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
    this.messageBad='';
    this.messageGood='';
    if (this.uploadMemoireForm.invalid) {
      console.log("Erreur d'upload");
      return;
    } else {
      if (this.fileSelected) {
        const body = new FormData();
        body.append('fichier', this.fileSelected, this.fileSelected.name);
        body.append('idProj', this.idProj);

        this.uploadService.upload(body).subscribe(
          (result) => {
            console.log(result);
            this.messageGood = 'Upload Réussie !';
            this.uploadMemoireForm.reset();
          },
          (error) => {}
        );
      } else {
        this.messageBad = 'Aucun fichier selectionné';
      }
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
