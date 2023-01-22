import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { dateToObject } from 'src/app/_helpers/dateToObject';
import { stringToObject } from 'src/app/_helpers/stringToObject';
import { AppointmentService } from 'src/app/_services/appointment/appointment.service';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { NotificationService } from 'src/app/_services/notification/notification.service';
import{GetDemandDetailsComponent} from 'src/app/Dialogs/get-demand-details/get-demand-details.component'
import {verifDateInInterval} from 'src/app/_helpers/customValidators/mustMatch'
import { FicheSanitaireService } from 'src/app/_services/ficheSanitaire/fiche-sanitaire.service';
import { UserService } from 'src/app/_services/userServices/user.service';
@Component({
  selector: 'app-en-attente',
  templateUrl: './en-attente.component.html',
  styleUrls: ['./en-attente.component.css']
})
export class EnAttenteComponent implements AfterViewInit {

  rendezVousForm !:FormGroup
  submitted=false
  open=false
  errorMessage="";
  successMessage="";
  demand:any;
  start!:Date
  end!:Date;

  constructor(private appointmentService:AppointmentService,
              private authenticationService:AuthenticationService,
              private userService : UserService,
              private ficheSanitaireService:FicheSanitaireService,
              private notificationService:NotificationService,
              private formBuilder:FormBuilder,
              private router:Router,
              public dialog: MatDialog ) 
              {    // choose time
                this.rendezVousForm=this.formBuilder.group({
                  date: ["",[Validators.required]],
                  time: ["",Validators.required], 
               }) }


               
  displayedColumns: string[] = ['date', 'time','cin','patientName', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.data=[]
    this.dataSource.paginator = this.paginator;
    this.appointmentService.getDemandeAppointment({doctor:this.authenticationService.getCurrentUser()._id,status:false}).subscribe({
      next:(data)=>{console.log("data",data.data);
      this.dataSource=data.data},
      error:(err)=>{console.log("err: ",err)}
    })
  }

get f(){return this.rendezVousForm.controls;}

refuse(id:any,doctor:any,patient:any)
{
  this.appointmentService.deleteDemande(id).subscribe({
    next:(data)=>{
      this.successMessage="removed successfully"
      console.log("data :",data)
       setTimeout(() => {this.successMessage=""}, 5000);
       this.ngAfterViewInit()
       return true

    },
    error:(err)=>{
     this.errorMessage="error delete :"+err
    console.log("error delete :",err)
     setTimeout(() => {this.errorMessage=""}, 5000);
    return false
    }
  })
  this.notificationService.create({Destinateur:doctor,recepteur:patient,content:"your demand has prosponed for some reasons please try later ! "}).subscribe({
    next:(data)=>{
      this.successMessage="notif sent successfully to patient"
      console.log("data :",data)
       setTimeout(() => {this.successMessage=""}, 5000);
    },
    error:(err)=>{
      this.errorMessage="error notif:"+err
     console.log("error :",err)
      setTimeout(() => {this.errorMessage=""}, 5000);
     }
  })
}

submitDate()
{
this.submitted=true
if(this.rendezVousForm.valid)
{let time=stringToObject(this.rendezVousForm.value.time)
let date= dateToObject(this.rendezVousForm.value.date)
this.appointmentService.validateDemande(this.demand._id,{ 
  year:date.year ,
  month:date.month,
  day:date.day,
  hour:time.hour,
  minutes:time.minutes}).subscribe({
    next:(data)=>{
      console.log("data sdemand validation :", data)
      this.successMessage=data.message
      setTimeout(()=>{this.successMessage=""},3000)
    },
    error:(err)=>{
      console.log("error demand validation : ", err.error.message)
      this.errorMessage=err.error.message
      setTimeout(()=>{this.errorMessage=""},3000)
    }
  })  
  this.open=false;
  this.ngAfterViewInit()
}}

async addPatient(id_doctor:any , id_patient:any)
{
 await this.userService.addPatient(id_doctor,id_patient).subscribe({
    next:(data)=>{
      console.log("added patients  data :",data);
      this.successMessage="patient added successfully"
      setTimeout(()=>{this.successMessage=""},5000)
      return true
    },
    error:(err)=>{
      console.log("error error addition patient :",err);
      this.errorMessage="error :"+err.error.message
      setTimeout(()=>{this.errorMessage=""},5000)
      return  false
    }
  })

}

async createFicheSanitaire(patient:any,doctor:any,firstdescription:any)
{
await this.ficheSanitaireService.createFicheSanitaire(patient,doctor,firstdescription).subscribe({
  next:(data)=>{
    console.log("next data :",data);
    this.successMessage="fiche has been created successfully"
    setTimeout(()=>{this.successMessage=""},5000)
    return true
  },
  error:(err)=>{
    console.log("error error subscribe :",err);
    this.errorMessage="error :"+err.error.message
    setTimeout(()=>{this.errorMessage=""},5000)
    return false
  }

})

}


async createAppointment(date:any,time:any)
{
  console.log("notif reciever :",this.demand.patient._id)
let appointment={
  date: { 
    year:date.year ,
    month:date.month,
    day:date.day,
    hour:time.hour,
    minutes:time.minutes} ,
patient:this.demand.patient._id,
doctor:this.demand.doctor._id,
associateDemand:this.demand._id
}

await this.appointmentService.createAppointment(appointment).subscribe({
  next:(data)=>{
    console.log("next data :",data);
    this.successMessage="Appointment has been created successfully"
    setTimeout(()=>{this.successMessage=""},5000)
    return true
  },
  error:(err)=>{
    console.log("error error subscribe :",err);
    this.errorMessage="error :"+err.error.message
     setTimeout(()=>{this.errorMessage=""},5000)
     return false
  }
})
}

async sendNotification(date:any,time:any)
{
  console.log("date :",date.year,"time :",time)
let date_string=date.year.toString()+"/"+date.month.toString()+"/"+date.day.toString()
let time_string=time.hour.toString()+":"+time.minutes.toString()


console.log("demande : ",this.demand)
let notif={ 
  recepteur:this.demand.patient._id,
  Destinateur:this.demand.doctor._id,
  content:"this is your appointment date please  be on time "+date_string +" - "+time_string}
console.log("notif :",notif)
await this.notificationService.create(notif).subscribe({
  next:(data)=>{
    console.log("next data :",data);
    this.successMessage="notification sent  successfully"
    setTimeout(()=>{this.successMessage=""},5000)
    return true
  },
  error:(err)=>{
    console.log("error error subscribe :",err);
    this.errorMessage="error :"+err.error.message
    setTimeout(()=>{this.errorMessage=""},5000)
    return  false
  }
})
}

openDialog(demande:any)
{
  if(!this.authenticationService.loggedIn())
  {
     this.router.navigate(["/login"])
     return
}
  this.dialog.open(GetDemandDetailsComponent,{data:demande});

}


validate(demand:any)
{
console.log("demande : ",demand)
this.demand=demand
this.open=true;
this.start=demand.debutDatesDisponible;
this.end=demand.finDatesDisponible
}

}
