import { ValidationService } from './../../../service/validation.service';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './../../../service/login.service';
import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

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

  constructor(
    private ValidationService : ValidationService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(this.ValidationService.formRules.nonEmpty)]],
      password: ['', [Validators.required, Validators.pattern(this.ValidationService.formRules.nonEmpty), Validators.minLength(6)]]
    });

    this.usernameControl = this.loginForm.get('username') as FormControl;
    this.passwordControl = this.loginForm.get('password') as FormControl;
    console.log("tessssstt :::::",this.usernameControl)
  }

  onValidate(): boolean {
    this.submitted = true;
    // Stop here if form is invalid
    return this.loginForm.valid;
  }

  onSubmit(): void {
    if (this.onValidate()) {
      this.loginService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log(response);
          const jwtToken = response.accessToken;
          localStorage.setItem('jwt', jwtToken);
          this.router.navigateByUrl("/dashboard");
        },
        (error) => {
          console.error(error);
          // Traiter l'erreur de connexion ici
          // Par exemple, si c'est une erreur de validation, vous pouvez ajouter des erreurs au formulaire
          const errorCode = error.error.code; // Assurez-vous de capturer le code d'erreur correctement depuis la réponse du serveur
          if (errorCode === 'validation_error') {
            const errors = error.error.errors; // Supposons que le serveur renvoie les erreurs sous forme d'objet avec les clés correspondant aux champs du formulaire
            for (const key in errors) {
              if (errors.hasOwnProperty(key)) {
                // Utilisez l'opérateur de navigation sécurisé pour éviter l'erreur "Object is possibly 'null'"
                this.loginForm.get(key)?.setErrors({ 'serverError': errors[key] });
              }
            }
          } else {
            // Le formulaire est invalide, affichez un message d'erreur générique
            alert('Veuillez remplir le formulaire correctement.');
          }
        }
      );
    }
  }

  getErrorMessage(fieldName: string): string {
    if (fieldName === 'username') {
      const usernameErrors = this.loginForm.get('username')?.errors;
      if (usernameErrors?.['required']) {
        return this.ValidationService.errorMessages.username.required;
      } else if (usernameErrors?.['minlength']) {
        return this.ValidationService.errorMessages.username.minLength;
      } else if (usernameErrors?.['pattern']) {
        return this.ValidationService.errorMessages.username.pattern;
      }
    } else if (fieldName === 'password') {
      const passwordErrors = this.loginForm.get('password')?.errors;
      if (passwordErrors?.['required']) {
        return this.ValidationService.errorMessages.password.required;
      } else if (passwordErrors?.['minLength']) {
        return this.ValidationService.errorMessages.password.minLength;
      } else if (passwordErrors?.['pattern']) {
        return this.ValidationService.errorMessages.password.pattern;
      }
    }
    return '';
  }
}

