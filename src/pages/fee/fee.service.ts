import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../enviroment/enviroment";
import { Fee } from "./fee.model";
import { Observable } from "rxjs";


@Injectable({  providedIn: 'root'
})

export class FeeService {
  feeUrl:string=environment.FEE_URL;

  constructor(private http: HttpClient) {}

  getFees(): Observable<Fee[]> {
    return this.http.get<Fee[]>(this.feeUrl);
  }




  }











