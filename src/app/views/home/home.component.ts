import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  compte: any;
  a: string;
  dateNaissance:string;
  lieuNaissance:string;

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
      this.dateNaissance=sessionStorage.getItem("dateNaissance") as string;
      this.lieuNaissance=sessionStorage.getItem("lieuNaissance") as string;
      
    this.authService.getCompte(this.a).subscribe(data => {
      this.compte = data;
      
    }); 
    
   
  }

}