import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-d-autorisation',
  templateUrl: './d-autorisation.component.html'
})
export class DAutorisationComponent implements OnInit {
  inputText: string = 'd-autorisation';
  submitted=false;
  idEtudiant:string;
  etudiant:any;
  test=false;
  profil= sessionStorage.getItem('profil');
  idProj=sessionStorage.getItem('idProjet') as string;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe(params => {
      this.idEtudiant = params.get('idEtudiant') as string;
    }) ;
    this.authService.getEtudiant(this.idEtudiant).subscribe(data=>{
      this.etudiant=data;
      if(this.etudiant.projet.demandeAutorisation){
        this.test=true;
      }
    })
  }
  onSubmit(url: string) {
    this.wait();
    this.submitted = true;
    this.authService.downloadFichier(url);
  
  }
  supprimer(idDemande:string){
    Swal.fire({
      title: 'Etes-vous sûr?',
      text: "Votre demande d'autorisation sera supprimé définitivement !!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#63b521',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.waitsuppression()
        this.authService.supprimerDemandesAutorisation(idDemande,this.idProj).subscribe(data=>{
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
