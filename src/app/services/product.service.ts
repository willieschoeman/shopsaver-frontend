import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class ProductService {

  private getProductKey = 'getproduct'

  constructor(private apiService: ApiService) { }

  // Get products for the user
  getProducts(data) {
    return this.apiService.post(this.getProductKey, data)
  }

}