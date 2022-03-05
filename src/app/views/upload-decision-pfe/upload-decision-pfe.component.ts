import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload-decision-pfe/upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';

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
  allProjets:any;
  hide = true;
  profil = sessionStorage.getItem('profil');
  idProj:string;
  idEtu:string;
  date:string;
  nom:string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadService: UploadService,
    public datepipe:DatePipe
  ) {
    this.date=this.datepipe.transform((new Date), 'dd_MM_yyyy_hh_mm_ss') as string;
  }

  ngOnInit(): void {
    this.uploadDecisionPfesForm = this.formBuilder.group({
      image: [null],
      etudiant: ['',Validators.required]
    });
    this.authService.getProjets2().subscribe(data=>{
      console.log(data)
      this.allProjets=data;
    })
  }

  get value() {
    return this.uploadDecisionPfesForm.controls;
  }
  get f() {
    return this.uploadDecisionPfesForm.controls;
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
        this.nom=this.date+'_'+this.fileSelected.name;
        this.wait();
        const body = new FormData();
        body.append('fichier', this.fileSelected, this.nom);
        body.append('idProj', this.idProj);

        this.uploadService.upload(body).subscribe(
          (result) => {
            Swal.close();
            this.alertGood();
            this.submitted=false;
            this.uploadDecisionPfesForm.reset();
          },
          (error) => {
            if(error.error=='erreur connexion firebase'){
              Swal.close();
              this.alertBad2();
              this.uploadDecisionPfesForm.reset();
            }
            console.log(error)
          }
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
  alertBad2(){
    Swal.fire({
      icon: 'error',
      title: 'Probléme de connexion !!!',
      text: 'veuillez vérifier votre connexion internet !',
      showConfirmButton: false,
      timer: 2000
    })
  }
}
