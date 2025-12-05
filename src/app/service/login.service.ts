import { UserIdServiceService } from './userIdService/user-id-service.service';
import { LoginComponent } from 'src/app/views/pages/login/login.component';
import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, tap } from 'rxjs';

import { ValidationService } from './validation.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  [x: string]: any;
  private  baseUrl = "http://localhost:8080/api/auth/login";
  public _loginComponent: LoginComponent;
  private _jwtToken: string;
  private _userRole: string;
  private _userId: number;
  private _userName : string;
  loggedInUser: any;
  constructor(private http: HttpClient,private userIdService: UserIdServiceService) { 
    this._userId = parseInt(sessionStorage.getItem('Id') || '0', 10);
    this._userName = sessionStorage.getItem('username') || '';
    this._jwtToken = sessionStorage.getItem('jwt') || '';
    this._userRole = sessionStorage.getItem('Role') || '';
}

 
login(loginRequest: any): Observable<any> {  
  let url = this.baseUrl;  
  return this.http.post(url, loginRequest);
}  
  set loginComponent(loginComponent: LoginComponent,) {
    this._loginComponent = loginComponent;
  }
  storeLoginInformation(jwtToken: string, userRole: string, userId: number, userName: string): void {
    if (jwtToken && userRole && userId && userName) {
      this._jwtToken = jwtToken;
      this._userRole = userRole;
      this._userId = userId;
      this._userName = userName;
    } else {
      console.error("Les informations de connexion ne sont pas valides.");
    }

    // Stocker également dans loggedInUser si nécessaire
    this.loggedInUser = {
      jwtToken: jwtToken,
      userRole: userRole,
      userId: userId,
      userName: userName,
    };
  }
  get jwtToken(): string {
    return this._jwtToken;
  }

  get userRole(): string {
    return this._userRole;
  }

  get userId(): number {
    return this._userId;
  }
  get userName(): string {
    return this._userName;
  }



}