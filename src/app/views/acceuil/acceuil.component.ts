import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html'
})
export class AcceuilComponent implements OnInit {
  prof: string;
  allProjets: any;
  adminForm: FormGroup;
  submitted = false;
  returnUrl: string;
  message = '';
  hide = true;
  profil = sessionStorage.getItem("profil");
  nom = sessionStorage.getItem("nom");
  prenom = sessionStorage.getItem("prenom");



  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  deconnexion() {
    this.authService.logOut();
    this.alert();
    this.refresh();
  }


  ngOnInit(): void {

    this.authService.getProjets().subscribe(data => {
      this.allProjets = data;
      setTimeout(() => {
        $('#memoire').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
        $('#article').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    });

  }
  alert(){
    Swal.fire({
      icon: 'success',
      title: 'Bye Bye !',
      showConfirmButton: false,
      timer: 1000
    })
  }
  refresh(): void {
    window.location.reload();
}

}

