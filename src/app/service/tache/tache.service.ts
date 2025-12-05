import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private httpClient:HttpClient) { }
  private url="http://localhost:8082/Tache";
  
  getTacheByLotId(lotId: number): Observable<any> {
    return this.httpClient.get(`${this.url}/parLot/${lotId}`);  
  }
    addTache(data1:any) : Observable<any>   
    {
      return this.httpClient.post(`${this.url}/create`,data1);  
    }  
    editTache(data1: any) : Observable<any>
    {
      return this.httpClient.put(`${this.url}/update`,data1);  
    }
    onDelete(id: number): Observable<any>
    {
      return this.httpClient.delete(`${this.url}/delete/${id}`)
    }
    getListeTacheByProjet(idProjet:number,year:number): Observable<any>{
   
      return this.httpClient.get(`${this.url}/TacheByProjet/${idProjet}/${year}`);  
    }
    getListeTacheByProjetByMonth(idProjet:number,month:number,year:number): Observable<any>{
      return this.httpClient.get(`${this.url}/getListeTacheByProjetByMonth/${idProjet}/${month}/${year}`);  
    }
    getListeUserByTache(idTache:number,year:number): Observable<any>{
      const params = new HttpParams()
      .set("idTache",idTache)
      .set('year', year)
      return this.httpClient.get(`${this.url}/getListeUserByTache`, { params });  
    }
    getListeUserByTacheAndMonth(idTache:number,month:number,year:number): Observable<any>{
      return this.httpClient.get(`${this.url}/getListeUserByTacheAndMonth/${idTache}/${month}/${year}`);  
    }
    getTotalTravailByTache(idTache:number,year:number): Observable<any>{
      const params = new HttpParams()
      .set("idTache",idTache)
      .set('year', year)
      return this.httpClient.get(`${this.url}/getTotalTravailByTache`, { params });  
    }
    getTotalTravailByTacheAndMonth(idTache:number,month:number,year:number): Observable<any>{
      return this.httpClient.get(`${this.url}/getTotalTravailByTacheAndMonth/${idTache}/${month}/${year}`);  
    }
    getTotalTravail(idTache:number,year:number): Observable<any>{
      const params = new HttpParams()
      .set("idTache",idTache)
      .set('year', year)
      return this.httpClient.get(`${this.url}/getTotalTravail`, { params });  
    }
    getTotalTravailTacheByMonth(idTache:number,month:number,year:number): Observable<any>{
      return this.httpClient.get(`${this.url}/getTotalTravailTacheByMonth/${idTache}/${month}/${year}`);  
    }
    calculerPourcentageTravailSurTache(idTache:number,year:number):Observable<any>{
      const params = new HttpParams()
      .set("idTache",idTache)
      .set('year', year)
      return this.httpClient.get(`${this.url}/calculerPourcentageTravailSurTache`, { params });  
    }
}

