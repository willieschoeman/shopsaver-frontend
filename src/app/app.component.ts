import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isLoggedIn: boolean

  constructor(private loginService: LoginService){

    this.loginService.login.subscribe(res => {
      this.isLoggedIn = res
    })
  }

  ngOnInit() {
  }
}
