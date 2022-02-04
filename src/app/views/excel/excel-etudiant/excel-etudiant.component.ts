import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UploadService } from '../../../services/upload-excel-etudiant/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-excel-etudiant',
  templateUrl: './excel-etudiant.component.html'
})
export class ExcelEtudiantComponent implements OnInit {b = false;
  uploadExcelForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
  message = '';
  hide = true;
  profil = sessionStorage.getItem('profil');

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
    this.uploadExcelForm = this.formBuilder.group({
      image: [null],
    });
  }

  get value() {
    return this.uploadExcelForm.controls;
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
    console.log('Bienvenue');
    if (this.uploadExcelForm.invalid) {
      console.log("Erreur d'upload");
      return;
    } else {
      if (this.fileSelected) {
        const body = new FormData();
        body.append('file', this.fileSelected, this.fileSelected.name);

        this.uploadService.upload(body).subscribe(
          (result) => {
            console.log(result);
            this.message = 'Upload Réussie !';
            this.uploadExcelForm.reset();
          },
          (error) => {}
        );
      } else {
        console.log('Rien ne va !');
      }
    }
  }

  refresh(): void {
    window.location.reload();
  }

}
