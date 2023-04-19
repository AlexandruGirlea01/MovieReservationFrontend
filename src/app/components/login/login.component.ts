import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: any;
  formGroup: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18)])
    })
  } 

  loginProcess(){
    this.authService.loginUser([this.formGroup.value.email, this.formGroup.value.password]).subscribe(result =>{
      if(result == "Wrong password!") alert("Wrong password!");
      else if(result == "There is no user with that email!") alert("There is no user with that email!");
      else{
        this.loginUser = result;
        localStorage.setItem("user", JSON.stringify(this.loginUser));
        this.router.navigateByUrl(`/projections/${this.loginUser.userId}`);
      }
    }, err => {
      alert(err.error);
    })
  }

  get Email() : FormControl{
    return this.formGroup.get("email") as FormControl;
  }

  get Password(): FormControl{
    return this.formGroup.get("password") as FormControl;
  }
}