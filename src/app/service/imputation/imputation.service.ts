import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {
  constructor(private httpClient:HttpClient) { }
  private url="http://localhost:8085/imputation";
    getImputationById(activiteId: number): Observable<any> 
    {
    return this.httpClient.get(`${this.url}/parActivite/${activiteId}`);  
    }
    getTotalHours(): Observable<any> {
      return this.httpClient.get(`${this.url}/total`); 
    }
    getTotalHoursByDate(dates:any[],idRapport:number,idUser:number): Observable<any>{
      const params = new HttpParams()
      .set('idRapport', idRapport)
      .set('idUser', idUser);
      return this.httpClient.post(`${this.url}/totalParDate`,dates, { params }); 
    }
    getAllImputation() : Observable<any>  
    { 
      return this.httpClient.get(`${this.url}/imputations`);  
    }
    addImputation(data2:any) : Observable<any>   
    {
      return this.httpClient.post(`${this.url}/create`,data2);  
    }  
    editImputation(data2: any) : Observable<any>
    {
      return this.httpClient.put(`${this.url}/update`,data2);  
    }
    onDelete(id: number): Observable<any>
    {
      return this.httpClient.delete(`${this.url}/delete/${id}`)
    }
    getTotalImputation():Observable<any> 
    {
      return this.httpClient.get(`${this.url}/total`);
    }
    getPourcentageProjetUser(year:number,projets:any[],idUser:number):Observable<any> {
      const params = new HttpParams()
      .set('year',year)
      .set('idUser', idUser);
      return this.httpClient.post(`${this.url}/pourcentage`,projets, { params }); 
    }
    getPourcentageUserRapport(idProjet:number,idRapport:number,idUser:number):Observable<any>{
  
      return this.httpClient.get(`${this.url}/pourcentageByRapport/${idProjet}/${idRapport}/${idUser}`); 
    }
    getnbHeureByUser(projets:any[],idRapport:number,idUser:number):Observable<any>{
      const params = new HttpParams()
      .set('idRapport', idRapport)
      .set('idUser', idUser);
      return this.httpClient.post(`${this.url}/listeNbheureByRapport`,projets, { params }); 
    }
    getNbrUserOnProjet(year:number):Observable<any>{
      const params = new HttpParams()
      .set('year', year)
      return this.httpClient.get(`${this.url}/nbrUtilisateursParProjet`,{ params });
    }
    getTotalProjetByAnnee(year:number,projets:any[]):Observable<any>{
      const params = new HttpParams()
      .set('year', year)
      return this.httpClient.post(`${this.url}/TotalProjet`, projets,{ params }); 
    }
    getTotalChaqueProjetByAnnee(year:number,idProjet:number):Observable<any>{
      const params = new HttpParams()
      return this.httpClient.get(`${this.url}/getTotalChaqueProjetByAnnee/${year}/${idProjet}`); 
    }
    calculerPourcentageTravailSurProjets(year:number,idProjet:number):Observable<any>{
      return this.httpClient.get(`${this.url}/calculerPourcentageTravailSurProjets/${year}/${idProjet}`);
    }

    calculerPourcentageTravailSurProjetsByMonth(idProjet:number,month:number,year:number):Observable<any>{
      return this.httpClient.get(`${this.url}/calculerPourcentageTravailSurProjetsByMonth/${idProjet}/${month}/${year}`);
    }
  }
