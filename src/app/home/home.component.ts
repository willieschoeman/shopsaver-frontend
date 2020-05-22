import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('locationModal') locationModal: ElementRef
  public errorMgs: string
  public isLoading: boolean
  public isSubmitted: boolean
  public showForgotPasswordForm: boolean
  public categories: any
  public category: any;
  public selectedCategory: string;
  public categorySelected: boolean;
  public selectedPrice: number;
  public selectedDistance: number;
  public modalRef: BsModalRef

  constructor(private router: Router,
    private loginService: LoginService,
    private modalService: BsModalService,) {

    this.isLoading = true
    this.isSubmitted = false
    this.showForgotPasswordForm = false

    this.selectedCategory = ''
    this.categorySelected = false
    this.selectedPrice = 12000
    this.selectedDistance = 20

    this.categories = [
      { id: 'all', name: 'All Categories' },
      { id: 'clothing', name: 'Clothing' },
      { id: 'electronics', name: 'Electronics' },
      { id: 'furniture', name: 'Furniture' }
    ]

  }

  ngOnInit() {
    this.isLoading = true
    this.showForgotPasswordForm = false
    this.errorMgs = ''
    setTimeout(() => { this.isLoading = false }, 1000)
  }

  search() {

    this.isSubmitted = true;

    this.isLoading = true
    this.errorMgs = ''

    if (this.selectedCategory === '') {
      this.isLoading = false
      return
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false
      this.showLocationModal()
    }

  }

  showLocationModal() {
    this.modalRef = this.modalService.show(this.locationModal)
  }

  hideModal() {
    this.modalRef.hide()
  }

}