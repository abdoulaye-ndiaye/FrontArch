import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import * as pdfMake from "pdfmake/build/pdfmake";
const htmlToPdfmake = require("html-to-pdfmake");
import SignaturePad from 'signature_pad';

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
  save=false;


  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl: ElementRef;
  signatureImg: string;


  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  public async downloadAsPDF() {
    if(this.save==true){
      const pdfTable = this.pdfTable.nativeElement;
      var html = htmlToPdfmake(pdfTable.innerHTML);
      var documentDefinition = { 
        content: [
          html ]
      };
      
      pdfMake.createPdf(documentDefinition).open(); 
        this.clearPad();
    }
    else{
      this.alertBad()
    }
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
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    this.signaturePad.penColor="blue";
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    this.save=true;
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.alertGood();
    
  }
  refresh(): void {
    window.location.reload();

  }
  alertGood(){
    Swal.fire({
      icon: 'success',
      title: 'Enregistrée',
      showConfirmButton: false,
      timer: 1500
    })
  }
  alertBad(){
    Swal.fire({
      icon: 'error',
      title: "Veuillez enregistrer d'abord !!!",
      showConfirmButton: false,
      timer: 1500
    })
  }

}
