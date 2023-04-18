import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectionsComponent } from './components/projections/projections.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectionsLoggedComponent } from './components/projections-logged/projections-logged.component';
import { RoomComponent } from './components/room/room.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectionsComponent,
    RegisterComponent,
    LoginComponent,
    ProjectionsLoggedComponent,
    RoomComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
