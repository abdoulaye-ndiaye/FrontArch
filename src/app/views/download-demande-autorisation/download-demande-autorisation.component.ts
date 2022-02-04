import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-download-demande-autorisation',
  templateUrl: './download-demande-autorisation.component.html'
})
export class DownloadDemandeAutorisationComponent implements OnInit {
  inputText: string = 'download-demande-autorisation';
  allDemandeAutorisations: any;
  submitted = false;
  profil = sessionStorage.getItem("profil");


  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.authService.getDemandeAutorisation().subscribe(data => {
      this.allDemandeAutorisations = data;
    });
  }

  onSubmit(idDemandeAutorisation: string) {
    this.submitted = true;
    this.authService.downloadDemandeAutorisation(idDemandeAutorisation);
  }

}
