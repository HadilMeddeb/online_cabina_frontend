import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { UserService } from 'src/app/_services/userServices/user.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})

export class DoctorProfileComponent implements OnInit {
  doctor_id:any;
  doctor:any;
  comment:any=""
  commentForm!:FormGroup;
  comments=[]
  submitted=false
  p:number=1
  constructor(private route :ActivatedRoute,
              private userService:UserService,
              private formBuilder:FormBuilder,
              private authenticationService: AuthenticationService,
              private router : Router,
            ) { 
this.commentForm=this.formBuilder.group({
  comment: ["",[Validators.required]],
})}

get f(){return this.commentForm.controls}

onSubmit()
{
  this.submitted=true
  if(!this.authenticationService.loggedIn())
  {
    this.router.navigate(['/login'])
  }
  if (this.commentForm.valid)
  {
  this.userService.comment({text:this.commentForm.value.comment,pocessor:this.authenticationService.getCurrentUser()!._id},this.doctor_id).subscribe(
    { next: data => {
      console.log("data comment: ",data)
         this.ngOnInit()
    },
    error: err => {
      return console.log("error comment ",err)
      
    }}
  )
  }
}
  ngOnInit(): void {
    this.doctor_id = this.route.snapshot.paramMap.get('id');
    console.log("id :",this.doctor_id)
    this.userService.getDoctorById(this.doctor_id).subscribe({
      next:(data)=>{
        this.doctor=data.data;
        this.comments=data.data.Avis
      console.log("doctor :" , this.doctor)
      console.log("comments :" , this.comments)
      
      },
      error:(err)=>{
        console.log("error:",err)} 
  })}




}
