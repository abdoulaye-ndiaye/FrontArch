import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html'
})
export class AcceuilComponent implements OnInit {
  prof: string;
  allMemoiresFinis: any;
  allArticles:any;
  adminForm: FormGroup;
  submitted = false;
  returnUrl: string;
  message = '';
  hide = true;
  profil = sessionStorage.getItem("profil");
  nom = sessionStorage.getItem("nom");
  prenom = sessionStorage.getItem("prenom");
  nbmemoire:any;
  nbarticle:any;
  totalMemoire =0;
  totalArticle =0;


  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  deconnexion() {
    this.authService.logOut();
    this.alert();
    this.refresh();
  }
 

  ngOnInit(): void {

    this.authService.getMemoiresFinis().subscribe(data => {
      this.allMemoiresFinis = data;
      this.nbmemoire=data.length;
      for(let i=0; i<data.length; i++){
        this.totalMemoire += data[i].nbTelechargement; 
      }
      setTimeout(() => {
        $('#memoire').DataTable({
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
    });
    this.authService.getArticles().subscribe(data => {
      this.allArticles = data;
      this.nbarticle= data.length;
      for(let i=0; i<data.length; i++){
        this.totalArticle += data[i].nbTelechargement; 
      }
      setTimeout(() => {
        $('#article').DataTable({
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
    });

  }
  onSubmit(url: string) {
    this.wait();
     this.submitted = true;
     this.authService.downloadFichier(url);
      
   }
  
   changerNbTelMemoirefini( idMemoireFini: string, nbTelechargement:any){
    this.authService.changerNbTelMemoirefini(idMemoireFini, nbTelechargement).subscribe(data => {
    });
   }
   changerNbTelArticle( idArticle: string, nbTelechargement: any){
    this.authService.changerNbTelArticle(idArticle,nbTelechargement).subscribe(data => {
    
    });
  }

  
  

  alert(){
    Swal.fire({
      icon: 'success',
      title: 'Bye Bye !',
      showConfirmButton: false,
      timer: 1000
    })
  }
  refresh(): void {
    window.location.reload();
}
wait(){
  Swal.fire({
    icon: 'info',
    title: 'Ouverture en cours !'
  });
  Swal.showLoading();
}

}

