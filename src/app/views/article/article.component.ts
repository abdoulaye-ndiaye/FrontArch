import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  inputText='article';
  allArticles:any;
  idProf=sessionStorage.getItem('idProf');
  submitted=false;
  
  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getArticles().subscribe(data => {
      this.allArticles = data;
      setTimeout(() => {
        $('#article').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    });
  }
  onSubmit(url: string) {
    // this.wait();
     this.submitted = true;
     this.authService.downloadFichier(url);
    // Swal.close()
   }

}
