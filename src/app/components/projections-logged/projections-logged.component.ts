import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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

  currentUser: User  = JSON.parse(localStorage.getItem("user") || '{}');
  projections: Projection[] = [];
  route: ActivatedRoute;
  showDropdown = false;

  constructor( private projectionService: ProjectionService, private authService: AuthService,
     private router: Router,
     private elementRef: ElementRef) { 
       
  }

  ngOnInit(): void {

    this.projectionService.getProjections().subscribe(response => {
      this.projections = response;
    });
  }

  redirect(projectionId: number, userId: number){
    this.projectionService.findById(projectionId.toString()).subscribe(result => {
      localStorage.setItem("projection", JSON.stringify(result));
      this.router.navigateByUrl(`/projections/${userId}/room/${projectionId}`);
    })
  }

  logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("projection");
    this.router.navigateByUrl("/home")
  }
  
}
