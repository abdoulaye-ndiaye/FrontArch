import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';

@Component({
  selector: 'app-encadreurs',
  templateUrl: './encadreurs.component.html'
})
export class EncadreursComponent implements OnInit {
  inputText: string = 'encadreurs';
 

  profil = sessionStorage.getItem("profil");
  allProfesseurs:any[];
  projet:any;
  submitted = false;
  returnUrl : string;
  message = '';
  idEtu:string;
  hide = true;
  idProjet: string;
  idProf: string;
  encadreurs:any;

  constructor(
    private formBulder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
  ) { }
  

  ngOnInit(): void {
    
    this.idEtu= sessionStorage.getItem("idEtu") as string;
    
      this.authService.getProjetByIdEtudiant(this.idEtu).subscribe(data=>{
        this.idProjet=data._id;

        this.authService.getProjet(this.idProjet).subscribe(data => {
          this.projet = data;
          this.encadreurs=this.projet.encadreur;
          

          this.authService.listeProfesseur().subscribe(data => {
            this.allProfesseurs = data;
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
                pageLength: 5,
                processing: true,
                lengthMenu: [5, 10, 25],
              });
            }, 1);
            setTimeout(() => {
              $('#encadreurs').DataTable({
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
          }) ;
          
        });

        
      })

      

  

   
    
}

    onSubmit(idProf:string) {
      this.submitted =true;   
     
        this.authService.ajoutEncadreur(idProf, this.idProjet)
        .subscribe(
          results=>{
            this.alertGood1();
            this.refresh();
          }
        )
       
      }
      suppression(idProf:string){
        this.authService.supprimerEncadreur(idProf, this.idProjet)
        .subscribe(
          results=>{
            this.alertGood2();
            this.refresh();
          }
        )
      }
    
      refresh(): void {
        window.location.reload();
    }
    alertGood1(){
      Swal.fire({
        icon: 'success',
        title: 'Encadreur ajouté !',
        showConfirmButton: false,
        timer: 1500
      })
    }
    alertGood2(){
      Swal.fire({
        icon: 'success',
        title: 'Encadreur supprimé !',
        showConfirmButton: false,
        timer: 1500
      })
    }
}
