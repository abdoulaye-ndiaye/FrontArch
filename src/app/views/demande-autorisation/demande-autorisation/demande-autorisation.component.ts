import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';

import * as pdfMake from "pdfmake/build/pdfmake";
const htmlToPdfmake = require("html-to-pdfmake");
import { jsPDF } from "jspdf";


@Component({
  selector: 'app-demande-autorisation',
  templateUrl: './demande-autorisation.component.html'
})
export class DemandeAutorisationComponent implements OnInit{
  inputText: string = 'demande-autorisation';
  a:string;
  etudiant:any;
  date:string;
  classe:string;


  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  public async downloadAsPDF() {
  const pdfTable = this.pdfTable.nativeElement;
  var html = htmlToPdfmake(pdfTable.innerHTML);
  console.log(html)
  const documentDefinition = { content: html };
  console.log(documentDefinition)
  pdfMake.createPdf(documentDefinition).open(); 
     
  }

  
  
 
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public datepipe: DatePipe
  ) {
    this.date=this.datepipe.transform((new Date), 'dd/MM/yyyy') as string;
   }

  ngOnInit(): void {
    this.a = sessionStorage.getItem("idEtu") as string;

    this.authService.getEtudiant(this.a).subscribe(data => {
      this.etudiant = data;
      if(data.classe=="SI"){this.classe="Systèmes d'Information"}
      else if(data.classe=="SR"){this.classe="Systèmes et Reseaux"}

    });
  }

}
