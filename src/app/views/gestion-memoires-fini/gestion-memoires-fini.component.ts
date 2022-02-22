import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';

@Component({
  selector: 'app-gestion-memoires-fini',
  templateUrl: './gestion-memoires-fini.component.html'
})
export class GestionMemoiresFiniComponent implements OnInit {
  inputText: string = 'gestion-memoires-fini';
  memoiresFini:any;
  test=false;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getMemoiresFinis().subscribe(data=>{
      this.memoiresFini=data;
      console.log(data)
      setTimeout(() => {
        $('#etudiants').DataTable({
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
          pageLength: 10,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    })

  }
  supprimer(idMemoireFini :string){
    Swal.fire({
      title: 'Etes-vous sûr?',
      text: "Le mémoire sera supprimé définitivement !!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#63b521',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.waitsuppression()
        this.authService.supprimerMemoireFini(idMemoireFini).subscribe(data=>{
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
}
