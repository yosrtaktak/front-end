import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  constructor(private httpClient:HttpClient) { }
  private url="http://localhost:8083/historique";
  getAllHistorique(): Observable<any> 
  {
    return this.httpClient.get(`${this.url}/historiques`);
  }
  addHistorique(data:any) : Observable<any>
  {
    return this.httpClient.post(`${this.url}/create`,data); 
  }
  editHistorique(data: any) : Observable<any>
  {
    return this.httpClient.put(`${this.url}/update`,data);  
  }
  onDelete(id: number): Observable<any>
  {
    return this.httpClient.delete(`${this.url}/delete/${id}`)
  }
  getHistoriqueByRapportId(rapportId:number):Observable<any>{
    return this.httpClient.get(`${this.url}/parRapport/${rapportId}`);  
  }

}
