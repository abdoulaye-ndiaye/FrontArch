import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-creer-projet',
  templateUrl: './creer-projet.component.html'
})
export class CreerProjetComponent implements OnInit {

  ProjetForm: FormGroup;
  profil = sessionStorage.getItem("profil");
  allProfs: any;
  submitted = false;
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  get f() {
    return this.ProjetForm.controls;
  }

  get value() {
    return this.ProjetForm.controls;
  }

  ngOnInit(): void {
    this.ProjetForm = this.formBulder.group(
      {
        sujet: ['', Validators.required],
        description: [''],
        encadreur: ['', Validators.required],
        date_debut: ['', Validators.required],
        date_fin: ['', Validators.required],
        derrogation: [''],
      });

    this.authService.getProfs().subscribe(data => {
      this.allProfs = data;
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.ProjetForm.invalid) {
      return console.log("invalid");
    } else {
    
        this.authService
          .FormulaireProjet(
            this.ProjetForm.value.sujet,
            this.ProjetForm.value.description,
            this.ProjetForm.value.encadreur,
            this.ProjetForm.value.date_debut,
            this.ProjetForm.value.date_fin,
            this.ProjetForm.value.derrogation,
            this.ProjetForm.value.etat,
           
          )
          .subscribe(
            (resultat) => {
              console.log({ resultat: resultat });
              this.submitted = false;
              this.router.navigate(['/login']);
            },
            (error) => {
              console.log(error);
            }
          );
        alert('Création projet reussie');
      } 
    }
  }


