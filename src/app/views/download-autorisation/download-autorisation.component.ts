import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-download-autorisation',
  templateUrl: './download-autorisation.component.html'
})
export class DownloadAutorisationComponent implements OnInit {

  allAutorisations: any;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }



  ngOnInit(): void {

    this.authService.getAutorisation().subscribe(data => {
      this.allAutorisations = data;
    });
  }

  onSubmit(idAutorisation: string) {
    this.submitted = true;
    this.authService.downloadAutorisation(idAutorisation);
  }

}
