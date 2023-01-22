import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AppointmentService } from 'src/app/_services/appointment/appointment.service';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { NotificationService } from 'src/app/_services/notification/notification.service';
import{stringToObject} from "src/app/_helpers/stringToObject"
import{dateToObject} from "src/app/_helpers/dateToObject"
import { MatDialog } from '@angular/material/dialog';
import { AppoinmentDetailsComponent } from 'src/app/Dialogs/appoinment-details/appoinment-details.component';
@Component({
  selector: 'app-accepte',
  templateUrl: './accepte.component.html',
  styleUrls: ['./accepte.component.css']
})
export class AccepteComponent implements AfterViewInit  {
  errorMessage="";
  successMessage="";

  constructor(private appointmentService:AppointmentService,
              private authenticationService:AuthenticationService,
              public dialog: MatDialog ) {}
            
  displayedColumns: string[] = ['date', 'time','cin','patientName', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator !: MatPaginator;


  
  ngAfterViewInit() {
    this.appointmentService.getDemandeAppointment({doctor:this.authenticationService.getCurrentUser()._id,status:true}).subscribe({
      next:(data)=>{console.log("data",data.data);this.dataSource=data.data},
      error:(err)=>{console.log("err: ",err)}
    })
    this.dataSource.data=[]
    this.dataSource.paginator = this.paginator;
  }
  
  openDialog(id:any) {
    let appointmentData
    this.appointmentService.getAppointment_ByAssociatedDemand(id).subscribe({
      next:(data:any)=>{
        console.log("next data :",data)
        this.dialog.open(AppoinmentDetailsComponent,{data:data.data});
      },
      error:(err)=>{
       this.errorMessage="error delete :"+err
      console.log("error delete :",err)
       setTimeout(() => {this.errorMessage=""}, 5000);
      }
    })
    
  }

}

