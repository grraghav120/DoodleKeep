import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  onSignUp(requestBody:any){
    let body={
      "email":requestBody.emailAdd,
      "password":requestBody.password,
      "returnSecureToken":true,
    }
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3mCm-eO4H7rRzLPpAQLZahhZFVsn0p_A',body);
  }

  onLogin(requestBody:any){
    let body={
      "email":requestBody.emailAdd,
      "password":requestBody.password,
      "returnSecureToken":true,
    }
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3mCm-eO4H7rRzLPpAQLZahhZFVsn0p_A',body);
  }

}