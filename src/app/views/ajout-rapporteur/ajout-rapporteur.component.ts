import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-ajout-rapporteur',
  templateUrl: './ajout-rapporteur.component.html'
})
export class AjoutRapporteurComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  submitted = false;
  id : string;
  message = '';
  hide = true;
  allProjets: any;

  profil = sessionStorage.getItem("profil");

  constructor(
    private formBulder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      retrieve: true,
    };
    this.authService.getProjets().subscribe(data => {
      this.allProjets = data;
      this.dtTrigger.next(data);
    });
    }

    onSubmit() {
      this.submitted = true;
      
      this.router.navigate(['/rapporteurs']);
    }

}
