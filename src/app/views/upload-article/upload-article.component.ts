import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload-article/upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-article',
  templateUrl: './upload-article.component.html'
})
export class UploadArticleComponent implements OnInit {
  inputText: string = 'article';
  b = false;
  uploadArticleForm: FormGroup;
  fileSelected: File;
  imageUrl: any;
  submitted = false;
  returnUrl: string;
  hide = true;
  idProf=sessionStorage.getItem('idProf') as string;
  nom:string;
  date:string;


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
    this.uploadArticleForm = this.formBuilder.group({
      image: [null, Validators.required],
      sujet: ['', Validators.required],
      description: ['',Validators.required],

    });
    console.log(this.date)
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
        this.nom=this.date+'_'+this.fileSelected.name;
        this.wait();
        const body = new FormData();
        body.append('fichier', this.fileSelected, this.nom);
        body.append('idProf', this.idProf);
        body.append('sujet', this.uploadArticleForm.value.sujet);
        body.append('description', this.uploadArticleForm.value.description);

        this.uploadService.upload(body).subscribe(
          (result) => {
            Swal.close();
            this.router.navigate(['article']);
            this.alertGood();
          },
          (error) => {
            if(error.error=='erreur connexion firebase'){
              Swal.close();
              this.alertBad2();
              this.uploadArticleForm.reset();
            }else{
              Swal.close();
              this.submitted=false;
              this.alertEchec();
              this.uploadArticleForm.reset();     
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
