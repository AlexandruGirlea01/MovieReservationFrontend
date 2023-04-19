import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projection } from '../models/projection';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url = "Reservation"
  constructor(private http: HttpClient) { }

  public getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.apiUrl}/${this.url}`);
  }

  public postReservation(reservationInfo: Array<number>) {
    return this.http.post(`${environment.apiUrl}/Reservation`, {
      "reservationId": 0,
      "seatNumber": reservationInfo[0],
      "userId": reservationInfo[1],
      "projectionId": reservationInfo[2]
    });
  }

  public deleteReservation(id: number){
    return this.http.delete(`${environment.apiUrl}/Reservation/${id}`)
  }
}
