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

  getProjections() : Observable<Projection[]> {
    return this.http.get<Projection[]>(`${environment.apiUrl}/${this.url}`);
  }
  
  findById(projectionId: string | null){
    return this.http.get<Projection>(`${environment.apiUrl}/Projection/${projectionId}`);
  }

  modifyProjection(projectionInfo: Array<String>) {
    return this.http.put(`${environment.apiUrl}/Projection`, {
      "ProjectionId": projectionInfo[0],
      "Name": projectionInfo[1],
      "Description": projectionInfo[2],
      "Genre": projectionInfo[3],
      "Rating": projectionInfo[4]
    });
  }

  addProjection(projectionInfo: Array<String>){
    return this.http.post<Projection>(`${environment.apiUrl}/Projection`, {
      "ProjectionId": 0,
      "Name": projectionInfo[0],
      "Description": projectionInfo[1],
      "Genre": projectionInfo[2],
      "Rating": projectionInfo[3]
    })
  }

  deleteProjection(id: number){
    return this.http.delete(`${environment.apiUrl}/Projection/${id}`);
  }

}