import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';

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
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.NoteForm.invalid) {
      console.log("invalid form")
    } 
    else {
      this.test=true;
        this.authService
          .FormulaireNote(
            this.NoteForm.value.valeur,
            this.NoteForm.value.mention,
            this.NoteForm.value.etudiant     
          )
          .subscribe(
            (resultat) => {
              this.alertGood();
              console.log({ resultat: resultat });
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
      console.log(event.target.value);
      this.idProjet = event.target.value;
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
