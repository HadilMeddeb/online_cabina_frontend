import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { NotificationService } from 'src/app/_services/notification/notification.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  constructor() { }
  notifications:any
  ngOnInit(): void {

  
  
  }

}
