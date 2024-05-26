import { RolesService } from './roles/roles.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient,private rolesService :RolesService) { }
    private url="http://localhost:8081/user";
    getAllUsers() : Observable<any>  
    { 
      return this.httpClient.get(`${this.url}/users`);  
    }
    addUser(data:any) : Observable<any>   
    {
      return this.httpClient.post(`${this.url}/create`,data);  
    } 
    editUser (data: any) : Observable<any>
    {
      //data.role = data.roles.map((role: string) => this.rolesService.mapRole(role));
     
      return this.httpClient.put(`${this.url}/update`,data);  
    }
    onDelete(id: number): Observable<any>
    {
      return this.httpClient.delete(`${this.url}/delete/${id}`)
    }
  }

