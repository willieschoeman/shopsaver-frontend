import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, public router: Router) {}

  canActivate(): Observable<boolean> {

    return this.loginService.login.pipe(
      map(res => {
        if (res === true) {
          return true
        } else {    
          this.router.navigate(['/login'])
          return false
        }
      },
      error => {
        this.router.navigate(['/login'])
        return false
      })
    );
  }
}
