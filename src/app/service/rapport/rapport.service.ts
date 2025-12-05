import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  constructor(private httpClient:HttpClient) { }
  private url="http://localhost:8083/rapport";
  getAllRapport(): Observable<any> 
  {
    return this.httpClient.get(`${this.url}/rapports`);
  }
  getRapportByMonthAndYear(month:number,year:number,userId:number): Observable<any> {
    const params = new HttpParams()
      .set('month',month)
      .set('year', year)
      .set('userId', userId)
      return this.httpClient.get(`${this.url}/rapportsByYearAndMonth`, { params });  
  }
  getRapportByYear(year:number,userId:number): Observable<any> {
      return this.httpClient.get(`${this.url}/rapportsByYear/${year}/${userId}`);  
  }
  getRapportByIdUser(userId:number): Observable<any> {
    return this.httpClient.get(`${this.url}/rapportByIdUser/${userId}`);  
  }
  addRapport(data:any) : Observable<any>
  {
    return this.httpClient.post(`${this.url}/create`,data); 
  }
  editRapport(data: any) : Observable<any>
  {
    return this.httpClient.put(`${this.url}/update`,data);  
  }
  onDelete(id: number): Observable<any>
  {
    return this.httpClient.delete(`${this.url}/delete/${id}`)
  }
}
