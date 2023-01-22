import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { NotificationService } from 'src/app/_services/notification/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private notificationService:NotificationService,
              private authenticationService:AuthenticationService) { }
              notifications:any
  
  currentUser=this.authenticationService.getCurrentUser()
              displayedColumns: string[] = ['date','sender','content'];
              dataSource = new MatTableDataSource();
              ngOnInit(): void { 
                console.log("currentUser :", this.currentUser)
                this.notificationService.getPatientNotification(this.currentUser._id).subscribe({
                  next:(data)=>{
                    console.log("data notifs :", data.data)
                    this.dataSource.data=data.data
                  },
                  error:(err)=>{console.log("error :", err)}
                })}

}
