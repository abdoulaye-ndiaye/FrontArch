import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html'
})
export class EtudiantsComponent implements OnInit {
  inputText: string = 'dossier';

  allEtudiantsSI: Array<any> = [];
  allEtudiantsSR: Array<any> = [];

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getEtudiants();
  }

  getEtudiants() {
    this.authService.listeEtudiant().subscribe((data) => {
      this.allEtudiantsSI = (data as any).filter(
        (item: any) => item.classe === 'SI'
      );
      this.allEtudiantsSR = (data as any).filter(
        (item: any) => item.classe === 'SR'
      );
      setTimeout(() => {
        $('#etudiantsSI').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
        $('#etudiantsSR').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    });
  }

  deconnexion() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}

