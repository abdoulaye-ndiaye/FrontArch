import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UploadService } from '../../../services/upload-excel-etudiant/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-excel-etudiant',
  templateUrl: './excel-etudiant.component.html'
})
export class ExcelEtudiantComponent implements OnInit {
  inputText: string = 'excel-etudiant';
  b = false;
  uploadExcelForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
  messageBad = '';
  messageGood = '';
  hide = true;
  profil = sessionStorage.getItem('profil');
  data:any;

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
    this.messageBad='';
    this.messageGood='';
    if (this.uploadExcelForm.invalid) {
      console.log("Erreur d'upload");
      return;
    } else {
      if (this.fileSelected) {
        this.wait();
        const body = new FormData();
        body.append('file', this.fileSelected, this.fileSelected.name);

        this.uploadService.upload(body).subscribe(
          (result) => {
            this.data=result;
            Swal.close();
            this.alertGood();
            this.uploadExcelForm.reset();
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
