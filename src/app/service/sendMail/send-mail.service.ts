import { mailstructure } from './../../models/mailstructure';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private httpClient:HttpClient) { }
  private url="http://localhost:8086/mail";
  sendMail(mail:string,mailStructure:mailstructure): Observable<any> {
    return this.httpClient.post(`${this.url}/send/${mail}`,mailStructure);  
  }
}
