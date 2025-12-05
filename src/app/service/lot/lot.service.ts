import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(private httpClient:HttpClient) { }
  private url="http://localhost:8082/Lot";
  
  getLotByIdProjet(projetId: number): Observable<any> {
    return this.httpClient.get(`${this.url}/parProjet/${projetId}`);  
  }
    addLot(data1:any) : Observable<any>   
    {
      return this.httpClient.post(`${this.url}/create`,data1);  
    }  
    editLot(data1: any) : Observable<any>
    {
      return this.httpClient.put(`${this.url}/update`,data1);  
    }
    onDelete(id: number): Observable<any>
    {
      return this.httpClient.delete(`${this.url}/delete/${id}`)
    }

    getAllLot() : Observable<any>  
    { 
      return this.httpClient.get(`${this.url}/activites`);  
    }

}

