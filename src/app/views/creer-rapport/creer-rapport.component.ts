import { Component, OnInit, ElementRef,EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import * as pdfMake from "pdfmake/build/pdfmake";
const htmlToPdfmake = require("html-to-pdfmake");
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-creer-rapport',
  templateUrl: './creer-rapport.component.html'
})
export class CreerRapportComponent implements OnInit {
  @Input() resume : any;
  @Input() fond : any;
  @Input() forme : any;
  @Input() conclusion : any;
  @Input() idEtudiant : string;

  inputText: string = 'creer-rapport';
  a:string;
  etudiant:any;
  date:string;
  save=false;


  signaturePad2: SignaturePad;
  signaturePad3: SignaturePad;
  signaturePad4: SignaturePad;

  @ViewChild('canvas2') canvasEl2: ElementRef;
  signatureImg2: string;
  @ViewChild('canvas3') canvasEl3: ElementRef;
  signatureImg3: string;
  @ViewChild('canvas4') canvasEl4: ElementRef;
  signatureImg4: string;


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
    this.authService.getEtudiant(this.idEtudiant).subscribe(data => {
      this.etudiant = data;
    });
  }
  ngAfterViewInit() {
    
    this.signaturePad2 = new SignaturePad(this.canvasEl2.nativeElement);
    this.signaturePad2.penColor="blue";
    this.signaturePad3 = new SignaturePad(this.canvasEl3.nativeElement);
    this.signaturePad3.penColor="blue";
    this.signaturePad4 = new SignaturePad(this.canvasEl4.nativeElement);
    this.signaturePad4.penColor="blue";
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad2.clear();
    this.signaturePad3.clear();
    this.signaturePad4.clear();
  }

  savePad() {
    this.save=true;
    const base64Data2 = this.signaturePad2.toDataURL();
    const base64Data3 = this.signaturePad3.toDataURL();
    const base64Data4 = this.signaturePad4.toDataURL();
    this.signatureImg2 = base64Data2;
    this.signatureImg3 = base64Data3;
    this.signatureImg4 = base64Data4;
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
