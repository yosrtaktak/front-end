import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private httpClient:HttpClient) { }
  private url="http://localhost:8082/Offre";
  getAllOffre(): Observable<any>{
    return this.httpClient.get(`${this.url}/offres`,);  
  }
  getOffreByIdRapport(rapportId: number): Observable<any> {
    return this.httpClient.get(`${this.url}/parRapport/${rapportId}`);  
  }
    addOffre(data1:any) : Observable<any>   
    {
      return this.httpClient.post(`${this.url}/create`,data1);  
    }  
    editOffre(data1: any) : Observable<any>
    {
      return this.httpClient.put(`${this.url}/update`,data1);  
    }
    onDelete(id: number): Observable<any>
    {
      return this.httpClient.delete(`${this.url}/delete/${id}`)
    }
}
