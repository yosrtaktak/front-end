import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient:HttpClient) {   }
  private url="http://localhost:8082/projet";
  getProjetByRapportId(rapportId: number): Observable<any> {
    return this.httpClient.get(`${this.url}/parRapport/${rapportId}`);  
  }
  getAllProjects() : Observable<any>  
    { 
      return this.httpClient.get(`${this.url}/projets`);  
    }
    addProject(data:any) : Observable<any>   
    {
      return this.httpClient.post(`${this.url}/create`,data);  
    }  
    editProject (data: any) : Observable<any>
    {
      return this.httpClient.put(`${this.url}/update`,data);  
    }
    onDelete(id: number): Observable<any>
    {
      return this.httpClient.delete(`${this.url}/delete/${id}`)
    }
    getListeProjetByAnnee(year:number): Observable<any>{
      const params = new HttpParams()
      .set('year', year)
      return this.httpClient.get(`${this.url}/getListeProjetByAnne`, { params }); 
    }
    getListeProjetDeUserByMonth(idUser:number,month:number,year:number): Observable<any>{
      const params = new HttpParams()
      .set('idUser', idUser)
      .set('month', month)
      .set('year', year)
      return this.httpClient.get(`${this.url}/getListeProjetDeUserByMonth`, { params });  
    }
    getListeProjetByMonth(year:number,month:number): Observable<any>{
      const params = new HttpParams()
      .set('year', year)
      .set('month', month)
      return this.httpClient.get(`${this.url}/getListeListeProjetByMonth`, { params });  
    }
    getListeUserOnProjetByMonth(idProjet:number,month:number,year:number): Observable<any>{
      return this.httpClient.get(`${this.url}/getListeUserOnProjetByMonth/${idProjet}/${month}/${year}`);  
    }
    getListeProjetDeUserByYear(idUser:number,year:number): Observable<any>{
      const params = new HttpParams()
      .set('idUser',idUser)
      .set('year', year)
      return this.httpClient.get(`${this.url}/getListeProjetDeUserByYear`, { params });  
    }
    getTotalProjetByMois(year:number,month:number,idProjet:number):Observable<any>{
      return this.httpClient.get(`${this.url}/getTotalProjetByMois/${year}/${month}/${idProjet}`); 
    }
}
