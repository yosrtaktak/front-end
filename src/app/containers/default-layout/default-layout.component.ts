import { Component } from '@angular/core';

import { navItems } from './_nav';
import { LoginService } from 'src/app/service/login.service';
import {navItemsUser} from './navUser'
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public navItemsUser = navItemsUser;
  constructor(public loginService:LoginService) {}
}
