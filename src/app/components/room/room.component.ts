import { BuiltinType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projection } from 'src/app/models/projection';
import { Reservation } from 'src/app/models/reservation';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectionService } from 'src/app/services/projection.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  currentProjection: Projection = JSON.parse(localStorage.getItem("projection") || '{}');
  currentUser: User = JSON.parse(localStorage.getItem("user") || '{}');
  reservations: Reservation[] = [];
  selected: number[] = [];
  popup: boolean = false;
  deletable: number[] = [];
  toDelete: number[] = [];
  deletePopup: boolean = false;

  numbers: number[] = Array.from({ length: 200 }, (_, i) => i + 1);

  values: string[];

  constructor(private authService: AuthService, 
    private projectionService: ProjectionService,
    private router: Router,
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(result =>{ 
      this.reservations = result;
      this.values = this.getClassValues()
      for(let i=1;i<=200;i++){
        let button = document.getElementById(i.toString());
        button?.classList.add(this.values[i]);
        button?.classList.remove("ng-star-inserted")
      }
    })

  }

  toggleButton(index: number) {
    const button = document.getElementById((index+1).toString());
    var currentClass = button?.className;
    if(currentClass === 'free'){
      button?.classList.remove("free");
      button?.classList.add("selected");
      this.selected.push(index + 1);
    }
    else if(currentClass === "selected"){
      button?.classList.remove("selected");
      button?.classList.add("free");
      this.selected.splice(this.selected.indexOf(index + 1), 1);
    }
  }

  toggleAddOverlay(){
    if(this.selected.length !== 0) this.popup = true;
    else{
      alert("To make a reservation, you must first select at least one seat!")
    }
  }

  getClassValues(){
    var values: string[] = [];
    for(let i = 1; i <=200; i++) values[i]= 'free';
    for(let reservation of this.reservations){
      if(reservation.projectionId == this.currentProjection.projectionId){
          values[reservation.seatNumber] = 'reserved';
      }
    }
    return values;
  }

  makeReservation() {
    for(let i = 0; i < this.selected.length; i++){
      this.reservationService.postReservation([
        this.selected[i],
        this.currentUser.userId,
        this.currentProjection.projectionId
      ]).subscribe(res => {
        this.popup = false;
        window.location.reload();
      })
    }
    
  }

  initDeletable(){
    this.deletable = [];
    for(let reservation of this.reservations){
        if(reservation.projectionId == this.currentProjection.projectionId && reservation.userId == this.currentUser.userId){
          this.deletable.push(reservation.seatNumber );
        }
    }
    this.deletable.sort();
  }

  toggleToDelete(index: number){
    const button = document.getElementById((index).toString()+'O');
    var currentClass = button?.className;
    if(currentClass === 'deletable'){
      button?.classList.remove("deletable");
      button?.classList.add("deletable-selected");
      this.toDelete.push(index);
    }
    else if(currentClass === "deletable-selected"){
      button?.classList.remove("deletable-selected");
      button?.classList.add("deletable");
      this.toDelete.splice(this.selected.indexOf(index), 1);
    }
  }

  toggleDeleteOverlay(){
    this.initDeletable();
    if(this.deletable.length === 0) alert("You don't have any reservation for this projection!")
    else this.deletePopup = true;
  }

  deleteReservation(){
    for(let i = 0; i <= this.toDelete.length; i++){
      for(let reservation of this.reservations){
        if(reservation.projectionId == this.currentProjection.projectionId && reservation.userId == this.currentUser.userId 
          && reservation.seatNumber == this.toDelete[i]){
            this.reservationService.deleteReservation(reservation.reservationId).subscribe(result => {
                console.log(result);
                this.deletePopup = false;
                window.location.reload();
            })     
          }
      }
    }
    
  }
}
