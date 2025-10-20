import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RbacService  {
  viewUserUrl: string = environment.USER_URL;
  roleUrl:string = environment.ROLE_URL;


  constructor(private http: HttpClient) {
   }

  getUsers(){
    return this.http.get<any>(this.viewUserUrl);
  }

  getRoles(){
    return this.http.get<any>(environment.ROLE_URL);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(this.viewUserUrl, userData);
  }
  
  assignRole(roleData: any):Observable<any>{
  return this.http.post(this.roleUrl,roleData);
  }



  
  
}
