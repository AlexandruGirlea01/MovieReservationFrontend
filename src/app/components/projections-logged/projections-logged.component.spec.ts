import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionsLoggedComponent } from './projections-logged.component';

describe('ProjectionsLoggedComponent', () => {
  let component: ProjectionsLoggedComponent;
  let fixture: ComponentFixture<ProjectionsLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionsLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionsLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
