import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-autorisation',
  templateUrl: './certificat.component.html'
})
export class CertificatComponent implements OnInit {
  inputText: string = 'autorisation';
  submitted=false;
  idEtudiant:string;
  etudiant:any;
  test=false;
  idProj= sessionStorage.getItem('idProjet') as string;
  profil= sessionStorage.getItem('profil');

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
      if(this.etudiant.projet.certificat){
        this.test=true;
      }
    })
  }
  onSubmit(url: string) {
    this.wait();
    this.submitted = true;
    this.authService.downloadFichier(url);
  }
  supprimer(idCertificat:string){
    Swal.fire({
      title: 'Etes-vous sûr?',
      text: "Votre certificat d'inscription sera supprimé définitivement !!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#63b521',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.waitsuppression()
        this.authService.supprimerCertificat(idCertificat,this.idProj).subscribe(data=>{
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
