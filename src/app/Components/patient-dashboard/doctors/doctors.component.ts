import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { AppointmentService } from 'src/app/_services/appointment/appointment.service';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { ChatService } from 'src/app/_services/Chat/chat.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors:any
  constructor(private appointmentService:AppointmentService,
              private authenticationService: AuthenticationService,
              private chatService: ChatService,
              private route:Router  
           ) { }
displayedColumns: string[] = ['profileImage','fullname','speciality','email', 'actions'];
dataSource = new MatTableDataSource();
p: number = 1; 

initiateChat(doctor:any){
  let data={
   userIds:[doctor._id],
   chatInitiator:this.authenticationService.getCurrentUser()._id,
   patient:this.authenticationService.getCurrentUser(),
   doctor:doctor
 }
 console.log("data for chat :",data)
//  this.chatService.initiateChatRoom(data).subscribe({
//    next:(data:any)=>{
//     this.route.navigate(["patientDashboard/chat/"+data.chatRoom.chatRoomId])
//    },
//      error:(err)=>{console.log("err: ",err)}
//  })
 }

ngOnInit(): void {
  this.appointmentService.getDoctorsByPatient(this.authenticationService.getCurrentUser()._id).subscribe(
  { 
    next:(data)=>{
                  console.log("doctors :",data)
                 this.doctors=data
                 this.dataSource.data=data
                 },
    error:(err)=>{console.log("error getiing doctors :",err)}
  })

  }

}
