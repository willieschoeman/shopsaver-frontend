import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup
  public errorMgs: string
  public isLoading: boolean
  public isSubmitted: boolean
  public showForgotPasswordForm: boolean

  constructor(private router: Router, 
    formBuilder: FormBuilder,
    private loginService: LoginService) {

    this.isLoading = true
    this.isSubmitted = false
    this.showForgotPasswordForm = false

    this.userForm = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.isLoading = true
    this.showForgotPasswordForm = false
    this.errorMgs = ''
    setTimeout( () => { this.isLoading = false }, 1000 )
  }

  get formControls() {
    return this.userForm.controls
  }

  login() {

    this.isSubmitted = true;

    if (this.userForm.invalid) {
      return
    }

    this.isLoading = true
    this.errorMgs = ''

    const payload = { 
      'username': this.userForm.get("username").value, 
      'password': this.userForm.get("password").value
    }

    this.loginService.authenticate(payload)
      .subscribe(res => {
        if (res.success) {
          sessionStorage.setItem("XUSERID", res.response.user._id)
          sessionStorage.setItem('XUSERNAME', res.response.user.name)
          sessionStorage.setItem("XTOKEN", res.response.user.token)
          this.loginService.updateLogin(true)
          this.router.navigate(['home'])
          this.isLoading = false
          this.isSubmitted = false;
        } else {
          this.router.navigate(['login'])
          this.isLoading = false
          this.isSubmitted = false;
          this.errorMgs = res.message
        }
      },
      error => {
         this.isLoading = false
         this.isSubmitted = false;
         this.errorMgs = 'Unable to authenticate!'
      });

      this.userForm.reset()
  }

  forgotPassword() {
    this.showForgotPasswordForm = true
  }

  register() {
    this.router.navigate(['register'])
  }

}