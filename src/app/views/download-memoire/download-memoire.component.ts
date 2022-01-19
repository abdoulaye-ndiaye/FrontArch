import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-download-memoire',
  templateUrl: './download-memoire.component.html'
})
export class DownloadMemoireComponent implements OnInit {

  allMemoires:any;
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
    this.authService.getMemoire().subscribe(data => {
      this.allMemoires = data;
    });
  }

  onSubmit(idMemoire:string) {
    this.submitted =true;    
      this.authService.downloadMemoire(idMemoire);
    }


}
