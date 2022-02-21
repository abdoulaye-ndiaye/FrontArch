import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UploadService } from '../../../services/upload-excel-prof/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-excel-prof',
  templateUrl: './excel-prof.component.html'
})
export class ExcelProfComponent implements OnInit {
  inputText: string = 'excel-prof';
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
            setTimeout(() => {
              $('#professeur').DataTable({
                language: {
                  processing:     "Traitement en cours...",
                  search:         "Rechercher&nbsp;:",
                  lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
                  info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                  infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
                  infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                  infoPostFix:    "",
                  loadingRecords: "Chargement en cours...",
                  zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
                  emptyTable:     "Aucune donnée disponible dans le tableau",
                  paginate: {
                      first:      "Premier",
                      previous:   "Pr&eacute;c&eacute;dent",
                      next:       "Suivant",
                      last:       "Dernier"
                  },
                  aria: {
                      sortAscending:  ": activer pour trier la colonne par ordre croissant",
                      sortDescending: ": activer pour trier la colonne par ordre décroissant"
                  }
              },
                pagingType: 'full_numbers',
                pageLength: 5,
                processing: true,
                lengthMenu: [5, 10, 25],
              });
            }, 1);
            Swal.close();
            this.alertGood();
            this.uploadExcelForm.reset();
          },
          (error) => {
            console.log(error);
            if(error.status==400){
            Swal.close();
            this.error1();
            this.uploadExcelForm.reset();
            }
            else if(error.status==500) {
              Swal.close();
              this.error2();
              this.uploadExcelForm.reset();
            }
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
  error1(){
    Swal.fire({
      icon: 'error',
      title: 'Erreur...',
      text: "L'entête du fichier excel est incorrect !"
    })
  }
  error2(){
    Swal.fire({
      icon: 'error',
      title: 'Erreur...',
      text: 'Veuillez uploader un fichier excel !'
    })
  }
}
