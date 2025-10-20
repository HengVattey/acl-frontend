import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userView:String=environment.USER_URL;
  constructor(private http:HttpClient) {}
  
  getAllUser():void{
    // this.http.get(this.userView);
  }
}
