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
    return this.http.post<apiResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3mCm-eO4H7rRzLPpAQLZahhZFVsn0p_A',body);
  }
}

interface apiResponseData
  {
    "idToken": string,
    "email": string,
    "refreshToken": string,
    "expiresIn": string,
    "localId": string
  }