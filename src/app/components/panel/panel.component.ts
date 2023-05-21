import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Projection } from 'src/app/models/projection';
import { User } from 'src/app/models/user';
import { ProjectionService } from 'src/app/services/projection.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  projections?: Projection[];
  currentUser: User = JSON.parse(localStorage.getItem("user") || '{}');
  popup: Boolean = false;
  formGroup: FormGroup;

  constructor(private projectionService: ProjectionService, private router: Router) { }

  ngOnInit(): void {
    this.projectionService.getProjections().subscribe(projections => {
      this.projections = projections;
    });
  }

  toggleOverlay(){
    this.popup = true;
    this.initForm();
  }

  addProjection(){
    this.projectionService.addProjection([this.formGroup.value.name,
      this.formGroup.value.description, this.formGroup.value.genre, 
      this.formGroup.value.rating]).subscribe(result => {
        this.popup = false;
        window.location.reload();
      })
  }


  redirect(projectionId: number, userId: number){
    this.projectionService.findById(projectionId.toString()).subscribe(result => {
      localStorage.setItem("projection", JSON.stringify(result));
      this.router.navigateByUrl(`/projection/${projectionId}`);
    })
  }
  
  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z\'\ ]*')]),
      genre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      rating: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
  }
  
  navigateBack(){
    this.router.navigateByUrl(`/projections/${this.currentUser.userId}`);
  }
}
