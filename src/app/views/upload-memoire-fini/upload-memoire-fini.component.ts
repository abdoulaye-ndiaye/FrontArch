import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload-memoire-fini/upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-upload-memoire-fini',
  templateUrl: './upload-memoire-fini.component.html'
})
export class UploadMemoireFiniComponent implements OnInit {
  inputText: string = 'memoire-fini';
  b = false;
  uploadMemoireFiniForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
  hide = true;
  idProf=sessionStorage.getItem('idProf') as string;
  date:string;
  nom:string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadService: UploadService,
    public datepipe: DatePipe
  ) {
    this.date=this.datepipe.transform((new Date), 'dd_MM_yyyy_hh_mm_ss') as string;
  }

  ngOnInit(): void {
    this.uploadMemoireFiniForm = this.formBuilder.group({
      image: [null, Validators.required],
      sujet: ['', Validators.required],
      description: ['',Validators.required],
      etudiant: ['', Validators.required],
      encadreur: ['',Validators.required],
    });
  }

  get value() {
    return this.uploadMemoireFiniForm.controls;
  }
  get f(){
    return this.uploadMemoireFiniForm.controls;
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
    if (this.uploadMemoireFiniForm.invalid) {
      console.log("form invalid");
      return;
    } 
    else {
      if (this.fileSelected) {
        this.nom=this.date+'_'+this.fileSelected.name;
        this.wait();
        const body = new FormData();
        body.append('fichier', this.fileSelected, this.nom);
        body.append('idProf', this.idProf);
        body.append('sujet', this.uploadMemoireFiniForm.value.sujet);
        body.append('description', this.uploadMemoireFiniForm.value.description);
        body.append('etudiant', this.uploadMemoireFiniForm.value.etudiant);
        body.append('encadreur', this.uploadMemoireFiniForm.value.encadreur);

        this.uploadService.upload(body).subscribe(
          (result) => {
            Swal.close();
            this.alertGood();
            this.uploadMemoireFiniForm.reset();    
          },
          (error) => {
            if(error.error=='erreur connexion firebase'){
              Swal.close();
              this.alertBad2();
              this.uploadMemoireFiniForm.reset();          
              }else{
                Swal.close();
                this.submitted=false;
                this.alertEchec();
                this.uploadMemoireFiniForm.reset();     
              }
            console.log(error)
           
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
