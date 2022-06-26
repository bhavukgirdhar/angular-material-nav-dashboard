import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  loginForm!: FormGroup;

  companyIdHasError: boolean = false;
  companyIdErrorMessage: string = "Enter valid company id";
  usernameHasError: boolean = false;
  usernameErrorMessage: string = "Enter valid username";
  passwordHasError: boolean = false;
  passwordErrorMessage: string = "Enter valid password";
  userNameInvalid: boolean = false;

  loggingIn: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver) {

  }

  ngOnInit() {
    this.authenticationService.logout();

    this.loginForm = this.formBuilder.group({
      companyId: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  initializeVariables() {
    this.companyIdHasError = false;
  }

  login() {

    let isFormValidated = true;

    let companyId = this.loginForm!.get("companyId")!.value
    let username = this.loginForm!.get("username")!.value;
    let password = this.loginForm!.get("password")!.value;


    if (companyId == undefined || companyId == '') {
      this.companyIdHasError = true;
    } else {
      this.companyIdHasError = false;
    }

    if (username == undefined || username == '') {
      this.usernameHasError = true;
    } else {
      this.usernameHasError = false;
    }

    if (password == undefined || password == '') {
      this.passwordHasError = true;
    } else {
      this.passwordHasError = false;
    }


    if (this.companyIdHasError || this.usernameHasError || this.passwordHasError) {
      isFormValidated = false;
    }


    this.loggingIn = true;


    if (isFormValidated) {

      this.authenticationService.login(username, password, companyId)
        .subscribe({
          next: (data) => {
            // login successful if there's a  token in the response
            let userData = JSON.parse(JSON.stringify(data));
            // var authToken = response.token;
            var authToken = userData.token;
            if (authToken) {
              // store user details and  token in local storage to keep user logged in between page refreshes
              localStorage.setItem('authToken', authToken);
              localStorage.setItem('companyId', companyId);
              localStorage.setItem('userName', username);
            }

            this.router.navigate(['/main']);
          },
          error: () => {
            this.loggingIn = false;
            this.companyIdHasError = true;
            this.usernameHasError = true;
            this.passwordHasError = true;
          }
        }
        );

    }
  }

}
