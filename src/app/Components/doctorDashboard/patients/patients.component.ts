import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { ChatService } from 'src/app/_services/Chat/chat.service';
import { RoomService } from 'src/app/_services/rooms/room.service';
import { UserService } from 'src/app/_services/userServices/user.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements AfterViewInit {


  constructor(private authenticationService : AuthenticationService,
              private userService : UserService,
              private roomService:RoomService,
              private route:Router) { }
  
  currentDoctor=this.authenticationService.getCurrentUser()._id
  displayedColumns: string[] = ['first_name', 'last_name','cin','email', 'actions'];
  dataSource = new MatTableDataSource();
  patients:any =[]


remove(patient_id:any)
 {  this.userService.removePatient(this.authenticationService.getCurrentUser()._id,patient_id).subscribe({
    next:(data:any)=>{this.ngAfterViewInit()},
    error:(err)=>{console.log("err in remove patient : ",err)}})
}

 initiateChat(patient:any){
  this.roomService.verifyIfRoomExists({doctor:this.currentDoctor,patient}).subscribe(
    {
      next:(data:any)=>{
              if(data.data.exist)
              {
                this.route.navigate(["doctorDashboard/chat/"+data.data.chatRoom._id])
              }
              else
              {
                let data={userIds:[patient._id],
                          chatInitiator:this.currentDoctor,
                          patient:patient._id,
                          doctor:this.authenticationService.getCurrentUser()._id}
                
                    this.roomService.initiateChatRoom(data).subscribe({
                      next:(data)=> {this.route.navigate(["doctorDashboard/chat/"+data.chatRoom.chatRoomId])},
                      error:(err)=>{console.log("err: ",err)}
                    })
              }
          },
      error:(err)=>{console.log("err: ",err) ;}
    }) 
}
 
ngAfterViewInit() {
    this.dataSource.data=[]
    this.getPatients()
}

getPatients()
{
  this.userService.getDoctorPatients(this.authenticationService.getCurrentUser()._id).subscribe({
    next:(data:any)=>{this.dataSource=data},
    error:(err)=>{console.log("err: ",err)}})
}



}

