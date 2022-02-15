import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload-decision-pfe/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-upload-decision-pfe',
  templateUrl: './upload-decision-pfe.component.html',
})
export class UploadDecisionPfeComponent implements OnInit {

  inputText: string = 'upload-decision-pfe';
  b = false;
  uploadDecisionPfesForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
 
  hide = true;
  profil = sessionStorage.getItem('profil');
  idProj:string;
  idEtu:string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) {
    
  }

  ngOnInit(): void {
    this.idEtu = sessionStorage.getItem('idEtu') as string;
    this.uploadDecisionPfesForm = this.formBuilder.group({
      image: [null],
      hide: ['rien'],
    });
    this.authService.getProjetByIdEtudiant(this.idEtu).subscribe(data=>{
      this.idProj=data._id;
    })
  }

  get value() {
    return this.uploadDecisionPfesForm.controls;
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
   
    if (this.uploadDecisionPfesForm.invalid) {
      this.alertBad();
      return;
    } else {
      if (this.fileSelected) {
        this.wait();
        const body = new FormData();
        body.append('fichier', this.fileSelected, this.fileSelected.name);
        body.append('idProj', this.idProj);

        this.uploadService.upload(body).subscribe(
          (result) => {
            console.log(result);
            Swal.close();
            this.alertGood();
            this.uploadDecisionPfesForm.reset();
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
