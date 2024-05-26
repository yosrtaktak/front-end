import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  constructor(private httpClient:HttpClient) { }
  private url="http://localhost:8085/activite";
    getActiviteByIdRapport(rapportId: number): Observable<any> {
      return this.httpClient.get(`${this.url}/parRapport/${rapportId}`,{responseType: 'json'});  
    }
    addActivite(data1:any) : Observable<any>   
    {
      return this.httpClient.post(`${this.url}/create`,data1);  
    }  
    editActivite(data1: any) : Observable<any>
    {
      return this.httpClient.put(`${this.url}/update`,data1);  
    }
    onDelete(id: number): Observable<any>
    {
      return this.httpClient.delete(`${this.url}/delete/${id}`)
    }

    getAllActivite() : Observable<any>  
    { 
      return this.httpClient.get(`${this.url}/activites`);  
    }

}
