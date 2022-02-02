import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-creer-projet',
  templateUrl: './creer-projet.component.html'
})
export class CreerProjetComponent implements OnInit {

  profil = sessionStorage.getItem("profil");
  allProfs: any;
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getProfs().subscribe(data => {
      this.allProfs = data;
    });
  }

}
