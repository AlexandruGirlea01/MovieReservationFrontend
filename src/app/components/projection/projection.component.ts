import { Component, OnInit } from '@angular/core';
import { Projection } from 'src/app/models/projection';
import { ProjectionService } from 'src/app/services/projection.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit {

  currentUser: User = JSON.parse(localStorage.getItem("user") || '{}');
  projection: Projection = JSON.parse(localStorage.getItem("projection") || '{}');
  formGroup: FormGroup;

  constructor(private projectionService: ProjectionService, private router: Router) { }

  ngOnInit(): void {
    if (this.currentUser.isAdmin) this.initForm();
    else this.router.navigateByUrl("projections/" + this.currentUser.userId);
  }

  modifyProjection() {
    if (this.formGroup.value.name != this.projection.name ||
      this.formGroup.value.description != this.projection.description ||
      this.formGroup.value.genre != this.projection.genre ||
      this.formGroup.value.rating != this.projection.rating) {
      let projectionInfo = [this.projection.projectionId, this.formGroup.value.name,
      this.formGroup.value.description, this.formGroup.value.genre, this.formGroup.value.rating]
      this.projectionService.modifyProjection(projectionInfo).subscribe(result => {
        if(result !== 200 ) alert("Error on update!")  
        this.router.navigateByUrl('panel');
      })
    }
    else this.router.navigateByUrl('/projections/' + this.currentUser.userId.toString());
  }

  deleteProjection() {
    this.projectionService.deleteProjection(this.projection.projectionId).subscribe(result => {
      if(result != 0) alert("Error!");
      this.router.navigateByUrl("panel");
    });
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.projection.name, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      genre: new FormControl(this.projection.genre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      rating: new FormControl(this.projection.rating, [Validators.required]),
      description: new FormControl(this.projection.description)
    })
  }

}
