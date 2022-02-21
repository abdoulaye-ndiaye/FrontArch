import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';
import { Console } from 'console';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html'
})
export class NoteComponent implements OnInit {
  inputText: string = 'note';
  NoteForm: FormGroup;
  profil = sessionStorage.getItem("profil");
  allProjets: any;
  idProf= sessionStorage.getItem("idProf") as string;
  submitted = false;
  prof:any;
  idProjet:string;
  test=false;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  get f() {
    return this.NoteForm.controls;
  }

  get value() {
    return this.NoteForm.controls;
  }

  ngOnInit(): void {

    this.NoteForm = this.formBulder.group(
      {
        etudiant:['',Validators.required],
        valeur: ['', Validators.required],
        mention: ['',Validators.required],
        idProjet: ['']
      });

      this.authService.getProfesseur(this.idProf).subscribe(data=>{
        this.prof= data;
      })

    this.authService.getProjets().subscribe(data => {
      this.allProjets = data;
      console.log(data)
      setTimeout(() => {
        $('#projets').DataTable({
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

  onSubmit() {
    this.submitted = true;
    if (this.NoteForm.invalid) {
      console.log("invalid form")
    } 
    else {
        this.authService
          .FormulaireNote(
            this.NoteForm.value.valeur,
            this.NoteForm.value.mention,
            this.NoteForm.value.etudiant     
          )
          .subscribe(
            (resultat) => {
              this.alertGood();
              this.refresh()
              this.submitted = false;
            },
            (error) => {
              console.log(error);
              this.alertBad();
            }
          );
        
      } 
    }
    onChangeProjet(event: any) {
      this.idProjet = event.target.value;
    }
    refresh(): void {
      window.location.reload();
  }
    alertGood(){
      Swal.fire({
        icon: 'success',
        title: 'Note Créé avec succès',
        showConfirmButton: false,
        timer: 1500
      })
    }
    alertBad(){
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: "Echec de l'attribution de note !"
      })
    }
}
