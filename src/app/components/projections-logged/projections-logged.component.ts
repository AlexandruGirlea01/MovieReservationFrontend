import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Projection } from 'src/app/models/projection';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectionService } from 'src/app/services/projection.service';

@Component({
  selector: 'app-projections-logged',
  templateUrl: './projections-logged.component.html',
  styleUrls: ['./projections-logged.component.css']
})
export class ProjectionsLoggedComponent implements OnInit {

  currentUser: User;
  projections: Projection[] = [];
  route: ActivatedRoute;

  constructor( private projectionService: ProjectionService, private authService: AuthService, private router: Router) { 

  }

  ngOnInit(): void {
    this.projectionService.getProjections().subscribe(response => {
      this.projections = response;
    });

    this.authService.findById(localStorage.getItem("userId")).subscribe((response: User) =>{
      console.log(response.userId);
      this.currentUser = new User(response.userId, response.firstName, response.lastName, response.email, response.password, response.isAdmin);
    })
  }

  redirect(projectionId: number, userId: number){
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("projectionId", projectionId.toString());
    this.router.navigateByUrl(`/projections/${userId}/room/${projectionId}`);
  }
}
