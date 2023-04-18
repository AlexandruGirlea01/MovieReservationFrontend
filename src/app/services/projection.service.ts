import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projection } from '../models/projection';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {
  url = "Projection"
  constructor(private http: HttpClient) { }

  public getProjections() : Observable<Projection[]> {
    return this.http.get<Projection[]>(`${environment.apiUrl}/${this.url}`);
  }

  findById(projectionId: string | null){
    return this.http.get<Projection>(`${environment.apiUrl}/Projection/${projectionId}`);
  }
}