import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-download-rapport',
  templateUrl: './download-rapport.component.html'
})
export class DownloadRapportComponent implements OnInit {

  allRapports:any;
  submitted = false;
  compte: any;
  a:string;
  constructor(
    private router : Router,
    private authService : AuthService,
  ) { }
  deconnexion(){
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.a= sessionStorage.getItem("id") as string;
    this.authService.getCompte(this.a).subscribe(data => {
      this.compte = data;
      
    }); 
    this.authService.getRapport().subscribe(data => {
      this.allRapports = data;
    });
  }

  onSubmit(idRapport:string) {
    this.submitted =true;    
      this.authService.downloadRapport(idRapport);
    }

}
