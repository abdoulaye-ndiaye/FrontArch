import { Component } from '@angular/core';
import { SocketioService } from './services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Archivage';

  constructor (private socketService: SocketioService) {

  }

  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.ecouteMemoire();
    this.socketService.ecouteRapport();
    
    //this.socketService.crash();


  }
  ngOnDestroy() {
    this.socketService.disconnect();
  }

}
