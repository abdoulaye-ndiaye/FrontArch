import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-d-com-pfe',
  templateUrl: './d-com-pfe.component.html'
})
export class DComPfeComponent implements OnInit {
  inputText: string = 'd-com-pfe';
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
      this.idEtudiant = params.get('idEtudiant') as string;
    }) ;
    this.authService.getEtudiant(this.idEtudiant).subscribe(data=>{
      this.etudiant=data;
      console.log(data)
      if(this.etudiant.projet.decisionPfe){
        this.test=true;
      }
    })
  }
  onSubmit(url: string) {
    this.wait();
    this.submitted = true;
    this.authService.downloadFichier(url);
  }
  wait(){
    Swal.fire({
      icon: 'info',
      title: 'Ouverture en cours !'
    });
    Swal.showLoading();
  }

}
