import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { AppointmentService } from '../../_services/appointment/appointment.service';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { UserService } from 'src/app/_services/userServices/user.service';
import { MatDialog } from '@angular/material/dialog';
import { GetAppointmentComponent } from '../get-appointment/get-appointment.component';
;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
 public filterForm!: FormGroup;
 doctors:Doctor[]=[];
 loading=true;
errorMessage=""
 filterString=""
 successMessage=""
 p: number = 1;
  constructor( private formBuilder: FormBuilder,
               private userService:UserService,
               private demandeAppoinService:AppointmentService,
               private authenticationService:AuthenticationService,
               private router:Router,
               public dialog: MatDialog) {}


getAllDoctore(){
  this.userService.getAllDoctors().subscribe({
    next:data=>{
      this.doctors=data.data;
      this.loading=false;
      console.log("data: ",data.data)},
    error:err=>{
      this.errorMessage="error:",err;
      setTimeout(()=>{this.errorMessage=""},5000)
      console.log("error:",err)} 
  })
}

openDialog(doctor:any) {
  if(!this.authenticationService.loggedIn())
  {
     this.router.navigate(["/login"])
     return
}
  this.dialog.open(GetAppointmentComponent,{data:doctor});
}


ngOnInit(): void {this.getAllDoctore()}
 

}
