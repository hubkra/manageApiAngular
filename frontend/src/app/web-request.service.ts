import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly url;

  constructor(private http:HttpClient) { 
    this.url= 'http://localhost:3000';
  }

  get(uri:string){
   return this.http.get(`${this.url}/${uri}`);
  }

  post(uri:string,payload:Object){
    return this.http.post(`${this.url}/${uri}`, payload);
  }

  patch(uri:string,payload:Object){
    return  this.http.patch(`${this.url}/${uri}`, payload);
  }

  delete(uri:string){
    return  this.http.delete(`${this.url}/${uri}`);
  }

}
