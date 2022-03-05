import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload-memoire/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';
import { SocketioService } from '../../services/socketio.service';


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
  date: string;
  hide = true;
  profil = sessionStorage.getItem('profil');
  idProj:string;
  idEtu:string;
  nom:string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uploadService: UploadService,
    public datepipe: DatePipe,
    private socketService: SocketioService
  ) {
    this.date=this.datepipe.transform((new Date), 'dd_MM_yyyy_hh_mm_ss') as string;
  }

  ngOnInit(): void {
    this.idEtu = sessionStorage.getItem('idEtu') as string;
    this.uploadMemoireForm = this.formBuilder.group({
      image: [null],
      hide: ['rien'],
    });
    this.authService.getProjetByIdEtudiant(this.idEtu).subscribe(data=>{
      this.idProj=data._id;
    })
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
   
    if (this.uploadMemoireForm.invalid) {
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
            this.socketService.nouveauMemoire(this.idProj);
            this.router.navigate(['home'])
          },
          (error) => {
            if(error.error=='erreur connexion firebase'){
              Swal.close();
              this.alertBad2();
              this.uploadMemoireForm.reset();
            }
            console.log(error);
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
