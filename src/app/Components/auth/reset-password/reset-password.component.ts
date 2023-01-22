import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{match_Validation} from "../../../utils/match_validation"
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  ResetForm!:FormGroup
  submitted:boolean=false;
  
  constructor(private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.ResetForm=this.formBuilder.group({
      password: ["",[Validators.required,Validators.minLength(8)] ],
      confirm: ["",Validators.required], 
      },{
      validators:[match_Validation.match('password','confirm')]
      })
  }
  get f(){
   return this.ResetForm.controls;
  }
  onSubmit(form:FormGroup)
  {
    this.submitted=true;
    console.log(this.ResetForm.value);
  }





}
