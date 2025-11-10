import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RbacService  {
  viewUserUrl: string = environment.USER_URL;
  roleUrl:string = environment.ROLE_URL;
  permissonUrl:string = environment.PERMISSIONS_URL;

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
  
  CreateRole(roleData: any):Observable<any>{
  return this.http.post(this.roleUrl,roleData);
  }

  // Assign Role to User
  assignRoleToUser(assignData:any):Observable<any>{
    const assignRoleUrl = `${this.viewUserUrl}/assign-role`;
    return this.http.post(assignRoleUrl,assignData);
  }
  graintRolePermission(grantData:any):Observable<any>{
    const grantPermissionUrl = `${this.permissonUrl}/grant`;
    return this.http.post(grantPermissionUrl,grantData);
  }
 createPermisson(permissionData:any):Observable<any>{
    return this.http.post(this.permissonUrl,permissionData);
  }
  
}
