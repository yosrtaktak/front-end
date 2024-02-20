import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private  baseUrl = "http://localhost:8080/api/auth/login";
 
  login(loginRequest : any) : Observable<any>  
  {  
      let url = this.baseUrl ;  
      return this.http.post(url, loginRequest);  
  }   
  

}