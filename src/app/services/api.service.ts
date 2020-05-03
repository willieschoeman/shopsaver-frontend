import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  private backendApi = 'http://localhost:3000'
  private urlPath = ''

  private urls = {
    login: '/api/authenticate/login',
    getproduct: '/api/product/getproduct'
  }

  constructor(private http: HttpClient) {
  }

  // Build headers
  private getHeaders() {

    let headers = new HttpHeaders()

    headers = headers.append('x-source', 'portal')

    if (sessionStorage.getItem("XUSER")) {
      headers = headers.append('x-user', sessionStorage.getItem("XUSER"))
    }

    if (sessionStorage.getItem("XTOKEN")) {
      headers = headers.append('x-token', sessionStorage.getItem("XTOKEN"))
    }

    return headers
  }

  // Function to get the full URL needed for call
  private getFullURL(url) {
    return this.backendApi + this.urls[url];
  }

  // Function to do GET requests
  get(key, params) {

    this.urlPath = this.getFullURL(key)

    if (params) {
      this.urlPath += params
    }

    let headers = this.getHeaders()
    let options = {
      headers: headers
    }

    return this.http.get<any>(this.urlPath, options)
  }

  // Function to do POST requests
  post(key, body) {

    this.urlPath = this.getFullURL(key)

    let headers = this.getHeaders()
    let options = {
      headers: headers
    }

    return this.http.post<any>(this.urlPath, body, options)
  }

  // Function to do PUT requests
  put(key, params, body) {

    this.urlPath = this.getFullURL(key)

    if (params) {
      this.urlPath += params
    }

    let headers = this.getHeaders()
    let options = {
      headers: headers
    }

    return this.http.put<any>(this.urlPath, body, options)
  }

  // Function to do DELETE request
  delete(key, params) {

    this.urlPath = this.getFullURL(key)

    if (params) {
      this.urlPath += params
    }

    let headers = this.getHeaders()
    let options = {
      headers: headers
    }

    return this.http.delete<any>(this.urlPath, options)
  }
}