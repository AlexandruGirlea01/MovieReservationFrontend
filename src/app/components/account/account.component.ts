import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser: User = JSON.parse(localStorage.getItem("user") || '{}');
  formGroup: FormGroup;
  isUserValid: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      firstName: new FormControl(this.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl(this.currentUser.lastName, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl(this.currentUser.email, [Validators.required, Validators.email]),
    })
  }



  get FirstName(): FormControl {
    return this.formGroup.get("firstName") as FormControl;
  }

  get LastName(): FormControl {
    return this.formGroup.get("lastName") as FormControl;
  }

  get Email(): FormControl {
    return this.formGroup.get("email") as FormControl;
  }

  get Password(): FormControl {
    return this.formGroup.get("password") as FormControl;
  }

  modifyUser() {
    if (this.formGroup.value.firstName != this.currentUser.firstName ||
      this.formGroup.value.lastName != this.currentUser.lastName ||
      this.formGroup.value.email != this.currentUser.email) {
          let userInfo = [ this.currentUser.userId, this.formGroup.value.firstName, this.formGroup.value.lastName, this.formGroup.value.email, this.currentUser.password, this.currentUser.isAdmin]
          this.authService.modifyUser(userInfo).subscribe(result => {
            this.router.navigateByUrl('/projections/'+this.currentUser.userId.toString())
            this.currentUser.firstName = this.formGroup.value.firstName;
            this.currentUser.lastName = this.formGroup.value.lastName;
            this.currentUser.email = this.formGroup.value.email;
            localStorage.setItem("user", JSON.stringify(this.currentUser));
          })
    }
    else{
      this.router.navigateByUrl('/projections/'+this.currentUser.userId.toString())
    }
  }
}
