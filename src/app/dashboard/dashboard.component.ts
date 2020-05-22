import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { SearchPipe } from '../pipes/search.pipe';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal: ElementRef
  public modalRef: BsModalRef
  public isLoading: boolean
  public products: any
  public query: string
  private userId: string
  public selectedId: string
  public deleteError: string
  public deleteItem: string

  constructor(private router: Router,
    public searchPipe: SearchPipe,
    private modalService: BsModalService,
    private loginService: LoginService,
    private productService: ProductService
  ) {
    this.isLoading = true
    this.products = []
    this.query = ''
    this.selectedId = ''
    this.deleteError = ''
    this.deleteItem = ''
  }

  ngOnInit() {
    this.isLoading = true
    this.userId = sessionStorage.getItem("XUSERID")

    this.deleteError = ''
    this.selectedId = ''
    this.deleteItem = ''
    this.products = []

    this.getProducts()

  }

  getProducts() {
    this.isLoading = true

    const payload = {
      'userId': this.userId
    }

    this.productService.getProducts(payload)
      .subscribe(res => {
        this.isLoading = false
        this.products = res.response.products

      },
        error => {
          this.isLoading = false
        });
  }

  editProduct(id) {
    this.router.navigate(["edit-stock", id])
  }

  addProduct() {
    this.router.navigate(["add-stock"])
  }

  deleteProduct(id) {

    this.selectedId = id
    this.deleteItem = this.products.find(x => x._id === this.selectedId).productName

    this.showDeleteModal()
  }

  confirmDelete() {
    this.isLoading = true

    this.deleteError = ''

    const params = "/" + this.selectedId

  }

  showDeleteModal() {
    this.modalRef = this.modalService.show(this.deleteModal)
  }

  hideModal() {
    this.modalRef.hide()
  }
}