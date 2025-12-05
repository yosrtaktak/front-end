import { ValidationService } from './../../../service/validation.service';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './../../../service/login.service';
import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  [x: string]: any;
  loginForm: FormGroup;
  usernameControl: FormControl;
  passwordControl: FormControl;
  submitted = false;
  username: string;
  password : string;
  errorMessage = 'username or password invalid';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  formErrors: any;
  formControls!: string[];
  userRole : string[];
  passwordVisible: boolean = false;
  constructor(
    private ValidationService : ValidationService,
    private fb: FormBuilder,
    public loginService: LoginService,
    private router: Router,
  ) {  
     }

  ngOnInit(): void {
    this.loginService.loginComponent = this;
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(this.ValidationService.formRules.nonEmpty)]],
      password: ['', [Validators.required, Validators.pattern(this.ValidationService.formRules.nonEmpty),]]
    });
    
    this.usernameControl = this.loginForm.get('username') as FormControl;
    this.passwordControl = this.loginForm.get('password') as FormControl;
 
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  
  onValidate(): boolean {
    this.submitted = true;
    return this.loginForm.valid;
  }

  onSubmit(): void {
    if (this.onValidate()) {
      this.loginService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log(response);
          const jwtToken = response.accessToken;
          const userRole = response.roles;
          const userId = response.id;
          const userName = response.username;
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          sessionStorage.setItem('jwt', jwtToken); 
          sessionStorage.setItem('Role', userRole);
          sessionStorage.setItem('Id',userId);
          sessionStorage.setItem('username',userName)
          this.userRole = userRole;
          console.log("  this.userRole ",  this.userRole )
          this.loginService.storeLoginInformation(jwtToken, userRole, userId,userName)
          this.router.navigateByUrl("/dashboard");
        
        },
        () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      );
    }
  }
  }
  



