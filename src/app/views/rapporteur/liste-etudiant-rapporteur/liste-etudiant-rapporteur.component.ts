import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-liste-etudiant-rapporteur',
  templateUrl: './liste-etudiant-rapporteur.component.html',
})
export class ListeEtudiantRapporteurComponent implements OnInit {

  inputText: string = 'liste-etudiant-rapporteur';
  submitted = false;
  id : string;
  message = '';
  hide = true;
  allProjets: any;


  profil = sessionStorage.getItem("profil");
  idProf = sessionStorage.getItem("idProf");

  constructor(
    private formBulder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
   
    this.authService.getProjets2().subscribe(data => {
      this.allProjets = data;
      setTimeout(() => {
        $('#projet').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    });
    }

    onSubmit() {
      this.submitted = true;
      
    }
}
