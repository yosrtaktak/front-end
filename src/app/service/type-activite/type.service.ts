import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  constructor(private httpClient:HttpClient) { }
  private url="http://localhost:8085/type";
    getAllTypes() : Observable<any>  
    { 
      return this.httpClient.get(`${this.url}/types`);  
    }

}
