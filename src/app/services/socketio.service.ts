import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})

export class SocketioService {
  socket:any;
  rapporteurs:any;
  idProj=sessionStorage.getItem('idProjet');
  idProf=sessionStorage.getItem('idProf');
  idEtu=sessionStorage.getItem('idEtu');
  lien:string;


  constructor(        
    private router: Router,
    private authService: AuthService
    ) {   }

  setupSocketConnection() {
    this.socket = io(environment.apiUrl);
  }
  crash(){
    this.socket.on('crash',(data:string)=>{
      console.log(data);
      if(data=='restart'){
        this.refresh();
      }
    })
  }
  ecouteRapport(){
    this.socket.on('rapport', (data: string) => {
      this.socket.on('idProj', (data2: string) => {
        if(data2==this.idProj){
          this.lien='/rapport?idEtudiant='+this.idEtu+'';
          Swal.fire({
            title: data,
            text: '',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#63b521',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Attendre plus tard !',
            confirmButtonText: 'Voir le rapport'
          }).then((result) => {
            if (result.isConfirmed) {
              if(this.router.url==this.lien){
                this.refresh()
              }
              else{
                this.router.navigate(['/rapport'],{queryParams:{idEtudiant:this.idEtu}})
              }
            }
          })
        }
      });
    });
  }
  ecouteMemoire(){
    this.socket.on('memoire', (data: string) => {
      console.log('bon12')
      this.socket.on('idProj', (data2: string) => {
        this.authService.getProjet(data2).subscribe(data3=>{
          this.rapporteurs=data3.rapporteur;
          console.log(this.rapporteurs);
          console.log(this.idProf);
          if(this.rapporteurs.includes(this.idProf)){
            this.lien='/memoire-etudiant?idEtudiant='+this.idEtu+'';
            Swal.fire({
              title: data3.etudiant.compte.prenom+' '+data3.etudiant.compte.nom+' '+data,
              text: '',
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#63b521',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Attendre plus tard !',
              confirmButtonText: 'Voir le mémoire'
            }).then((result) => {
              if (result.isConfirmed) {
                if(this.router.url==this.lien){
                  this.refresh()
                }
                else{
                this.router.navigate(['/memoire-etudiant'],{queryParams:{idEtudiant:data3.etudiant._id}})
                }
              }
            })
          }
        })
      });
    });
  }
  refresh(): void {
    window.location.reload();
  }
  nouveauRapport(idProj:string){
    this.socket = io(environment.apiUrl);
    this.socket.emit('rapport', 'Vous avez un nouveau rapport de votre rapporteur ',idProj);
    
  }
  nouveauMemoire(idProj:string){
    this.socket = io(environment.apiUrl);
    this.socket.emit('memoire', 'a chargé son mémoire',idProj);
    
  }
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}

}
