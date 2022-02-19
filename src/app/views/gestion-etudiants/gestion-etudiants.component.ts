import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';

@Component({
  selector: 'app-gestion-etudiants',
  templateUrl: './gestion-etudiants.component.html'
})
export class GestionEtudiantsComponent implements OnInit {
  inputText: string = 'gestion-etudiants';
  etudiants:any;
  test=false;

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getEtudiants().subscribe(data=>{
      this.etudiants=data;
      console.log(data)
      setTimeout(() => {
        $('#etudiants').DataTable({
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    })

  }
  debloquer(idCompte: string){
    this.authService.debloquerCompte(idCompte).subscribe(data=>{
      this.alertGood2()
      this.refresh()
    })
  }
  bloquer(idCompte: string){
    this.authService.bloquerCompte(idCompte).subscribe(data=>{
      this.alertGood1()
      this.refresh()
    })
  }
  alertGood1(){
    Swal.fire({
      icon: 'success',
      title: 'Compte bloqué !',
      showConfirmButton: false,
      timer: 1300
      
    })
  }
  alertGood2(){
    Swal.fire({
      icon: 'success',
      title: 'Compte débloqué !',
      showConfirmButton: false,
      timer: 1300
      
    })
  }
   refresh(): void {
    window.location.reload();
}

}
