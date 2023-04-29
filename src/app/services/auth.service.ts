import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http : HttpClient) { }

  registerUser(registerInfo: Array<String>){
    return this.http.post(`${environment.apiUrl}/User`, {
      "UserId" : 0,
      "FirstName" : registerInfo[0],
      "LastName" : registerInfo[1],
      "Email": registerInfo[2],
      "Password": registerInfo[3],
      "IsAdmin" : 0
    });
  }

  loginUser(loginInfo: Array<String>){
    return this.http.post(`${environment.apiUrl}/Login`, {
      "Email": loginInfo[0],
      "Password": loginInfo[1],
    });
  }

  modifyUser(userInfo: Array<String>){
    return this.http.put(`${environment.apiUrl}/User`, {
      "UserId": userInfo[0],
      "FirstName": userInfo[1],
      "LastName": userInfo[2],
      "Email": userInfo[3],
      "Password": userInfo[4],
      "IsAdmin": userInfo[5]
    });
  }

}
