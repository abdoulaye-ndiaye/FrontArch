import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-download-memoire',
  templateUrl: './download-memoire.component.html'
})
export class DownloadMemoireComponent implements OnInit {

  allMemoires: any;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }



  ngOnInit(): void {

    this.authService.getMemoire().subscribe(data => {
      this.allMemoires = data;
    });
  }

  onSubmit(idMemoire: string) {
    this.submitted = true;
    this.authService.downloadMemoire(idMemoire);
  }


}
