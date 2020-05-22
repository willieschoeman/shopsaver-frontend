import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class ProductService {

  private getProductKey = 'getProduct'
  private getProductByLocation = 'getProductByLocation'

  constructor(private apiService: ApiService) { }

  // Get products for the user
  getProducts(data: any) {
    return this.apiService.post(this.getProductKey, data)
  }

  // Get products based on location (home)
  getProductLocation(data: any) {
    return this.apiService.post(this.getProductByLocation, data)
  }

}