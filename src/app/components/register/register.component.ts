import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formGroup: FormGroup;
  isUserValid: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18)])
    })
  } 
  
  registerProcess(){
    this.authService.registerUser([
      this.formGroup.value.firstName,
      this.formGroup.value.lastName,
      this.formGroup.value.email,
      this.formGroup.value.password
    ]).subscribe(res => {
      if(res !== 0) {
        alert("There was a problem at registering!");
      }
      else{
        alert("You have successfully registered!");
      }
    });  
    this.formGroup.reset();  
  }

  get FirstName(): FormControl{
    return this.formGroup.get("firstName") as FormControl;
  }

  get LastName(): FormControl{
    return this.formGroup.get("lastName") as FormControl;
  }

  get Email() : FormControl{
    return this.formGroup.get("email") as FormControl;
  }

  get Password(): FormControl{
    return this.formGroup.get("password") as FormControl;
  }
}
