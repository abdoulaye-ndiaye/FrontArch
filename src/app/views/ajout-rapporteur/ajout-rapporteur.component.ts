import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-ajout-rapporteur',
  templateUrl: './ajout-rapporteur.component.html'
})
export class AjoutRapporteurComponent implements OnInit {
  inputText: string = 'ajout-rapporteur';
  

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
   
    this.authService.getProjets().subscribe(data => {
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
      
      this.router.navigate(['/rapporteurs']);
    }

}
