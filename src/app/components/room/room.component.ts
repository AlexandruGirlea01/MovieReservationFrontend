import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projection } from 'src/app/models/projection';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectionService } from 'src/app/services/projection.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  currentProjection: Projection;
  currentUser: User;

  numbers: number[] = Array.from({ length: 200 }, (_, i) => i + 1);

  buttonColors: string[] = Array(200).fill('lightgreen');

  constructor(private authService: AuthService, private projectionService: ProjectionService, private router: Router) { }

  ngOnInit(): void {
    this.authService.findById(localStorage.getItem("userId")).subscribe((response: User) =>{
      this.currentUser = new User(response.userId, response.firstName, response.lastName, response.email, response.password, response.isAdmin);
    })

    this.projectionService.findById(localStorage.getItem("projectionId")).subscribe((response: Projection) =>{
      this.currentProjection = new Projection(response.projectionId, response.name, response.description, response.genre, response.rating);
    })
  }

  toggleButton(index: number) {
    const color = this.buttonColors[index] === 'lightgreen' ? '#e823fa' : 'lightgreen';
    this.buttonColors[index] = color;
  }
}
