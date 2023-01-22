import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/_services/auth/registration.service';
import { Location } from '@angular/common';
import{length,passwordValidation,tarifValidation,mustMatch} from "../../../_helpers/customValidators/mustMatch"
import {stringDateToObject} from '../../../_helpers/stringToObject'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  DoctorForm !:FormGroup;
  PatientForm !:FormGroup;
  submitted:boolean=false;
  roles=["Doctor","Patient"];
  role = '';
  file:any;
  successMessage=""
  errorMessage=""

  constructor(private formBuilder: FormBuilder,
              private registrationService:RegistrationService,
              private route: Router,
              private location:Location) {       }

  ngOnInit(): void {
    this.PatientForm=this.formBuilder.group({
      email: ["",[Validators.required,Validators.email]],
      password: ["",[Validators.required,Validators.maxLength(20),Validators.minLength(6),passwordValidation]], 
      confirm: ["",Validators.required], 
      first_name: ["",[Validators.required,Validators.minLength(3)]], 
      last_name: ["",[Validators.required,Validators.minLength(3)]], 
      cin: ["",[Validators.required,length(8)]], 
      phone: ["",[Validators.required,length(8)]], 
      birthday: ["",[Validators.required]], 
      adress: ["",[Validators.required]], 
      marital_status: ["",[Validators.required]], 
    },

    {validator:mustMatch('password', 'confirm')})
    this.DoctorForm=this.formBuilder.group({
      email: ["",[Validators.required,Validators.email]],
      password: ["",[Validators.required,Validators.maxLength(20),Validators.minLength(6),passwordValidation]], 
      first_name: ["",[Validators.required,Validators.minLength(3)]], 
      confirm: ["",[Validators.required]], 
      last_name: ["",[Validators.required,Validators.minLength(3)]], 
      adressLocal: ["",[Validators.required,Validators.minLength(20)]],  
      speciality: ["",[Validators.required,Validators.minLength(6)]], 
      professionnal_career: ["",[Validators.required,Validators.minLength(100)]],
      tarif: ["",[Validators.required,tarifValidation(300)]],
      tel: ["",[Validators.required,length(8)]],
    },{validator:mustMatch('password', 'confirm')}
    )
  }

  get f_doctor(){
    return this.DoctorForm.controls;
  }
  get f_patient(){
    return this.PatientForm.controls;
  }
  
  onSubmitDoctor()
  {  
    console.log(this.DoctorForm.controls)
    this.submitted=true
    if(this.DoctorForm.invalid)
    { 
      this.errorMessage='invalid entred data !'
      setTimeout(()=>{this.errorMessage=""},5000)
      return
    }    
    this.registrationService.DoctorRegister(this.DoctorForm.value).subscribe(
     { next: data => {
        console.log(data);
        this.successMessage="registred  successfully"
        setTimeout(()=>{this.successMessage="";
        },5000)

        setTimeout(()=>{ 
          this.location.replaceState('/'); // clears browser history so they can't navigate with back button
          this.route.navigate(['login']); 
        },5000)
      },
      error: err => {
        this.errorMessage="error"+err;
        setTimeout(()=>{this.errorMessage=""},5000)
        return
      }})
  }
 
  onSubmitPatient()
  {
    this.submitted=true
    if(this.PatientForm.invalid)
    { 
      this.errorMessage='invalid entred data !'
      setTimeout(()=>{this.errorMessage=""},5000)
      return
    } 
    console.log("form controls", this.PatientForm.controls)   
    this.registrationService.PatientRegister(this.PatientForm.value).subscribe(
     { next: data => {
        console.log("next data :",data);
        this.successMessage="registred  successfully"
        setTimeout(()=>{this.successMessage=""},5000)
        setTimeout(()=>{ 
          this.location.replaceState('/'); // clears browser history so they can't navigate with back button
          this.route.navigate(['login']); 
        },5000)
      },
      error: err => {
        console.log("eroorr :mm",err)
        this.errorMessage="error pppppppppp:"+err;
        setTimeout(()=>{this.errorMessage=""},5000)
        return
      }})
  }
}

