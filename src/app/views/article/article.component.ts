import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  inputText='article';
  allArticles:any;
  idProf=sessionStorage.getItem('idProf') as string;
  submitted=false;
  
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getArticles().subscribe(data => {
      this.allArticles = data;
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
   supprimer(idArticle:string){
    Swal.fire({
      title: 'Etes-vous sûr?',
      text: "Votre article sera supprimé définitivement !!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#63b521',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.waitsuppression()
        this.authService.supprimerArticle(idArticle,this.idProf).subscribe(data=>{
          this.refresh()
        })
      }
    })
    
   }
   wait(){
    Swal.fire({
      icon: 'info',
      title: 'Ouverture en cours !'
    });
    Swal.showLoading();
  }
  waitsuppression(){
    Swal.fire({
      icon: 'info',
      title: 'Suppression en cours !'
    });
    Swal.showLoading();
  }
  refresh(): void {
    window.location.reload();
}
confirmation(){
  Swal.fire({
    title: 'Etes-vous sûr?',
    text: "Un email vous sera envoyé pour la réinitialisation",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#63b521',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Annuler',
    confirmButtonText: 'Oui, envoyer !'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Envoyé!',
        'Email envoyé avec succès',
        'success'
      )
    }
  })
}
}
