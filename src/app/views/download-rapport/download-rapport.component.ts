import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-download-rapport',
  templateUrl: './download-rapport.component.html'
})
export class DownloadRapportComponent implements OnInit {
  inputText: string = 'download-rapport';
  allRapports: any;
  submitted = false;
  profil = sessionStorage.getItem("profil");


  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {

    this.authService.getRapport().subscribe(data => {
      this.allRapports = data;
    });
  }


  onSubmit(url: string) {
    this.submitted = true;
    this.authService.downloadFichier(url);
  }
}
