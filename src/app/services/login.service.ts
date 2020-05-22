import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class LoginService {

  private loginKey = 'login'

  private loggedIn = new BehaviorSubject<boolean>(false);
  login = this.loggedIn.asObservable();

  constructor(private router: Router,
    private apiService: ApiService) { }

  // Logout user
  public logout() {
    this.authLogout()
    this.router.navigate(['home'])
  }

  // Auth logout
  private authLogout() {
    sessionStorage.removeItem("XTOKEN")
    sessionStorage.removeItem("XUSERID")
    sessionStorage.removeItem('XUSERNAME')
    this.updateLogin(false)
  }

  // Authenticate a user via auth
  authenticate(data) {
    return this.apiService.post(this.loginKey, data)
  }

  updateLogin(val) {
    this.loggedIn.next(val)
  }

}