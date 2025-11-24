import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { Role, UpdateUser } from './rbac.model';
import { User } from './domain/user';

@Injectable({
  providedIn: 'root'
})

export class RbacService  {
  UserUrl: string = environment.USER_URL;
  // roleUrl:string = environment.ROLE_URL;
  roleUrl:string = " http://localhost:8080/roles/allRoles";
  permissonUrl:string = environment.PERMISSIONS_URL;

  constructor(private http: HttpClient) {
  }
  

  getUsers(){
    return this.http.get<User[]>(this.UserUrl);
  }

  getAllRoles(){
    return this.http.get<Role[]>(this.roleUrl);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(this.UserUrl, userData);
  }
  
  CreateRole(roleData: any):Observable<any>{
  return this.http.post(this.roleUrl,roleData);
  }

  // Assign Role to User
  assignRoleToUser(assignData:any):Observable<any>{
    const assignRoleUrl = `${this.UserUrl}/assign-role`;
    return this.http.post(assignRoleUrl,assignData);
  }
  graintRolePermission(grantData:any):Observable<any>{
    const grantPermissionUrl = `${this.permissonUrl}/grant`;
    return this.http.post(grantPermissionUrl,grantData);
  }
 createPermisson(permissionData:any):Observable<any>{
    return this.http.post(this.permissonUrl,permissionData);
  }

  updateUser(userId:number, updatedData:UpdateUser):Observable<any>{
    const updateUserUrl = `${this.UserUrl}/${userId}`;
    return this.http.put(updateUserUrl,updatedData);
  }

  
}
