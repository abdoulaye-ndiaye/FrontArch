import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html'
})
export class AcceuilComponent implements OnInit{

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  prof:any;
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true,
      retrieve: true,
    };
    this.authService.getProjets().subscribe(data => {
      this.allProjets = data;
      this.dtTrigger.next(data);
    }); 
   
  }
   
  
}

  