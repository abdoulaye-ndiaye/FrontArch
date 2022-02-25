import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { SocketioService } from '../../services/socketio.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient,
    private socketService : SocketioService) { }

  upload(data: any){
    const HttpUploadOptions = {
      headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
    }
    return this.httpClient.post<any>(`${environment.apiUrl}/upload-memoire`, data);
  }
}
