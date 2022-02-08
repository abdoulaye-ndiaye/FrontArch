import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-download-memoire',
  templateUrl: './download-memoire.component.html'
})
export class DownloadMemoireComponent implements OnInit {
  inputText: string = 'download-memoire';
  allMemoires: any;
  submitted = false;
  profil = sessionStorage.getItem("profil");


  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }



  ngOnInit(): void {

    this.authService.getMemoire().subscribe(data => {
      this.allMemoires = data;
    });
  }

  onSubmit(url: string) {
    this.submitted = true;
    this.authService.downloadFichier(url);
  }
  wait(){
    Swal.fire({
      icon: 'info',
      title: 'Ouverture en cours !'
    });
    Swal.showLoading();
  }

}
