import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  authenticate(email:string, password:string) {
    return this.httpClient
      .post<any>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("email", userData.email);
          let tokenStr = "Bearer " + userData.token;
          console.log(tokenStr);
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("profil", userData.profil);
          sessionStorage.setItem("id", userData.id);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("email");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
  }
}

