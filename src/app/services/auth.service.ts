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

  async findById(userId: string | null){
    return await this.http.get<User>(`${environment.apiUrl}/User/${userId}`).toPromise();
  }
}
