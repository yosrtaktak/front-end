import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) {}

  logout() {
    
    if (localStorage.getItem('jwt') && localStorage.getItem('Role') && localStorage.getItem('Id') && localStorage.getItem('username') ) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('Role');
      localStorage.removeItem('Id');
      localStorage.removeItem('username');
    }
}
}
