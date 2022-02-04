import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-creer-projet',
  templateUrl: './creer-projet.component.html'
})
export class CreerProjetComponent implements OnInit {
  inputText: string = 'resp-form';
  ProjetForm: FormGroup;
  profil = sessionStorage.getItem("profil");
  allProfs: any;
  etat:string;
  idEtudiant:string;
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
        description: ['',Validators.required],
        encadreur: ['', Validators.required],
        date_debut: ['', Validators.required],
        date_fin: ['', Validators.required],
        etat: [''],
      });
      this.route.queryParamMap
    .subscribe(params => {
      console.log(params); 

      this.idEtudiant = params.get('idEtudiant') as string;
  }) ;

    this.authService.getProfs().subscribe(data => {
      this.allProfs = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    this.etat="validé";
    
    if (this.ProjetForm.invalid) {
      alert('echec');
      return console.log("invalid");

    } else {
    
        this.authService
          .FormulaireProjet(
            this.ProjetForm.value.sujet,
            this.ProjetForm.value.description,
            this.ProjetForm.value.encadreur,
            this.ProjetForm.value.date_debut,
            this.ProjetForm.value.date_fin,
            this.idEtudiant,
            this.etat
           
          )
          .subscribe(
            (resultat) => {
              alert('Création projet reussie');
              console.log({ resultat: resultat });
              this.submitted = false;
              this.router.navigate(['#']);
            },
            (error) => {
              console.log(error);
            }
          );
        
      } 
    }
  }


