import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html'
})
export class JuryComponent implements OnInit {
  inputText: string = 'jury';
  
  JuryForm: FormGroup;
  allProfs: any;
  submitted = false;
  idJury:string;
  idProjet:string;
  projet:any;
  encadreurs:any;
  rapporteurs:any;
  profs:any;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  get f() {
    return this.JuryForm.controls;
  }

  get value() {
    return this.JuryForm.controls;
  }

  ngOnInit(): void {
    this.JuryForm = this.formBulder.group(
      {
        batiment: ['', Validators.required],
        salleSoutenance: ['',Validators.required],
        numJury: ['', Validators.required],
        president: ['',Validators.required],
      });
      this.route.queryParamMap
      .subscribe(params => {
        console.log(params); 
  
        this.idProjet = params.get('idProjet') as string;
      }) ;

      this.authService.getProjet(this.idProjet).subscribe(data=>{
        this.projet=data;
        this.encadreurs=data.encadreur;
        this.rapporteurs=data.rapporteur;
      })

    this.authService.getProfs().subscribe(data => {
      this.allProfs = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.JuryForm.invalid) {
      console.log("invalid form")

    } else {
    
        this.authService
          .updateJury(
            this.projet.jury._id,
            this.JuryForm.value.batiment,
            this.JuryForm.value.salleSoutenance,
            this.JuryForm.value.numJury,
            this.JuryForm.value.president
          )
          .subscribe(
            (resultat) => {
              this.alertGood();
              console.log({ resultat: resultat });
              this.submitted = false;
              this.JuryForm.reset();
              this.router.navigate(['/dossier']);
            },
            (error) => {
              console.log(error);
              this.alertBad();
            }
          );
        
      } 
    }
    alertGood(){
      Swal.fire({
        icon: 'success',
        title: 'Jury Créé modifié succès',
        showConfirmButton: false,
        timer: 1500
      })
    }
    alertBad(){
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Echec de la modification du Jury !'
      })
    }
}
