import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';

@Component({
  selector: 'app-gestion-professeurs',
  templateUrl: './gestion-professeurs.component.html'
})
export class GestionProfesseursComponent implements OnInit {
  inputText: string = 'gestion-professeurs';
  professeurs:any;
  test=false;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getProfs().subscribe(data=>{
      this.professeurs=data;
      console.log(data)
      setTimeout(() => {
        $('#professeurs').DataTable({
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
  debloquer(idCompte: string){
    this.authService.debloquerCompte(idCompte).subscribe(data=>{
      this.alertGood2()
      this.refresh()
    })
  }
  bloquer(idCompte: string){
    this.authService.bloquerCompte(idCompte).subscribe(data=>{
      this.alertGood1()
      this.refresh()
    })
  }
  alertGood1(){
    Swal.fire({
      icon: 'success',
      title: 'Compte bloqué !',
      showConfirmButton: false,
      timer: 1300
      
    })
  }
  alertGood2(){
    Swal.fire({
      icon: 'success',
      title: 'Compte débloqué !',
      showConfirmButton: false,
      timer: 1300
      
    })
  }
   refresh(): void {
    window.location.reload();
}


}
