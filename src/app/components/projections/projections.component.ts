import { Component, OnInit } from '@angular/core';
import { Projection } from 'src/app/models/projection';
import { ProjectionService } from 'src/app/services/projection.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projections',
  templateUrl: './projections.component.html',
  styleUrls: ['./projections.component.css']
})
export class ProjectionsComponent implements OnInit {

  title= "Projection.UI";
  projections: Projection[] = [];
  currentUser: User;

  constructor( private projectionService: ProjectionService, router: Router) { 
  }

  ngOnInit(): void {
    this.projectionService.getProjections().subscribe(response => {
      this.projections = response;
    });
  }
  
}
