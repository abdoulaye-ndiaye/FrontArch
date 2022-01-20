import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  compte: any;
  a: string;


  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  deconnexion() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }


  ngOnInit(): void {
    this.a = sessionStorage.getItem("id") as string;

    this.authService.getCompte(this.a).subscribe(data => {
      this.compte = data;

    });

  }

}