import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('logoutModal') logoutModal: ElementRef
  public modalRef: BsModalRef

  constructor(
    private loginService: LoginService,
    private modalService: BsModalService,
    private router: Router) {    
  }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['home'])
  }

  updateProfile() {

  }

  showLogoutModal() {
    this.modalRef = this.modalService.show(this.logoutModal)
  }

  hideModal() {
    this.modalRef.hide()
  }

  logout() {
    this.hideModal()
    this.loginService.logout()
  }

}
