import { LogoutService } from './../../../service/logout/logout.service';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import {LoginComponent} from 'src/app/views/pages/login/login.component';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
[x: string]: any;
public iconSet: IconSetService
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(public loginService:LoginService,private logoutService:LogoutService,private classToggler: ClassToggleService) {
    super();
  }
  onLogout() {
    this.logoutService.logout(); // Appeler la méthode logout du service AuthService
  }
}
