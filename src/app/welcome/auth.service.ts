import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAccess:boolean=false;
  constructor(private http: HttpClient) {}

  onSignUp(requestBody: any) {
    let body = {
      email: requestBody.emailAdd,
      password: requestBody.password,
      returnSecureToken: true,
    };
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        environment.fireBaseKey,
      body
    );
  }

  onLogin(requestBody: any) {
    let body = {
      email: requestBody.emailAdd,
      password: requestBody.password,
      returnSecureToken: true,
    };
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        environment.fireBaseKey,
      body
    );
  }
}
