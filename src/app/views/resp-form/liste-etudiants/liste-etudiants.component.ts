import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-liste-etudiants',
  templateUrl: './liste-etudiants.component.html'
})
export class ListeEtudiantsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listeForm: FormGroup;
  profil = sessionStorage.getItem("profil");
  allEtudiants: any;
  submitted = false;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  

  ngOnInit(): void {
  

    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      retrieve: true,
    };
    this.authService.listeEtudiant().subscribe(data => {
      this.allEtudiants = data;
      this.dtTrigger.next(data);
    });
  }

  deconnexion() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
