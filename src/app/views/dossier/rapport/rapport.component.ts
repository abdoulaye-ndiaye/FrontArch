import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html'
})
export class RapportComponent implements OnInit {
  inputText: string = 'rapport';
  submitted=false;
  idEtudiant:string;
  etudiant:any;
  test=false;
  
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe(params => {
      console.log(params); 

      this.idEtudiant = params.get('idEtudiant') as string;
    }) ;
    this.authService.getEtudiant(this.idEtudiant).subscribe(data=>{
      this.etudiant=data;
      if(this.etudiant.projet.rapportRapporteur){
        this.test=true;
      }
    })
  }
  onSubmit(url: string) {
   // this.wait();
    this.submitted = true;
    this.authService.downloadFichier(url);
   // Swal.close()
  }
  wait(){
    Swal.fire({
      icon: 'info',
      title: 'Ouverture en cours !'
    });
    Swal.showLoading();
  }
}
