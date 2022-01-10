import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html'
})
export class AcceuilComponent implements OnInit {

  allProjets: any;
  adminForm : FormGroup;
  submitted = false;
  returnUrl : string;
  message = '';
  hide = true;

  constructor(
    private formBulder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getProjets().subscribe(data => {
      this.allProjets = data;
      
    }); 
  }
   
  
}
  