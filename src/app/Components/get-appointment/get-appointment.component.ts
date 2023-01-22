import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlashMessage } from 'flash-messages-angular/module/flash-message';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/_services/appointment/appointment.service';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';

@Component({
  selector: 'app-get-appointment',
  templateUrl: './get-appointment.component.html',
  styleUrls: ['./get-appointment.component.css']
})
export class GetAppointmentComponent implements OnInit ,OnDestroy {
  demandeForm !:FormGroup
  submitted=false
  successMessage="";
  errorMessage="";
  subscription!:Subscription
  constructor(private formBuilder:FormBuilder,
              private authenticationService:AuthenticationService,
              private demandeAppoinService :AppointmentService,
             @Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit(): void {
    this.demandeForm = this.formBuilder.group({
      start: [null,[Validators.required]],
      end: [null,[Validators.required]],
      maladieDetails:["",[Validators.required]],
      etat:["",[Validators.required]],
      raisonChoix:["",[Validators.required]],
    });
  }
  get f(){return this.demandeForm.controls}


ngOnDestroy(): void {
  this.subscription.unsubscribe()
}

onSubmit(doctor:any)
  {
    this.submitted=true
    if(this.demandeForm.valid)
    {
      let dataParams={date: { 
        day: new Date().getDay(),
        year: new Date().getFullYear(),
        month:new Date().getMonth(),
        hour: new Date().getHours(),
        minutes:new Date().getMinutes()},
        debutDatesDisponible:this.demandeForm.get("start")?.value,
        finDatesDisponible:this.demandeForm.get("end")?.value,
        maladieDetails:this.demandeForm.get("maladieDetails")?.value,
        etat:this.demandeForm.get("etat")?.value,
        raisonChoix:this.demandeForm.get("raisonChoix")?.value,
        doctor:doctor._id,
        patient:this.authenticationService.getCurrentUser()._id}
        
      console.log(this.demandeForm.controls)
      console.log(dataParams)
      
     this.subscription=this.demandeAppoinService.demanderAppointment(dataParams).subscribe({
       next:(data)=>{
        console.log("data damande :",data);
        this.successMessage="your Demand has been sent successfully"; setTimeout(()=>{this.successMessage=""},5000)},
        error:(err)=>{
        console.log("demande error :",err.error.message);
        this.errorMessage="error:"+err.error.message;
         setTimeout(()=>{this.errorMessage=""},5000)}
     })
    }
  }
}
