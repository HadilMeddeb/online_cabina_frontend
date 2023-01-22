import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { ChatService } from 'src/app/_services/Chat/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

loginForm!:FormGroup
submitted:boolean=false;
loading:boolean=false
returnUrl: string="";
error = '';


constructor(private formBuilder:FormBuilder,
            private route: ActivatedRoute,
            private router: Router,
            private authenticationService :AuthenticationService)
            {}


ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
    email: ["",[Validators.required,Validators.email]],
    password: ["",Validators.required], 
    })
}

get f() { return this.loginForm.controls; }


onSubmit() {
 //this.chatService.getConnected();
 this.authenticationService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
   next:data=>{
     console.log("data :",data)
     sessionStorage.setItem("Token",data.token)
     sessionStorage.setItem("current_user",JSON.stringify(data.user))
     this.authenticationService.redirect()
    },
   error:(error)=>{
     console.log("error :",error)
     this.error="error :"+error.error.message;
     setTimeout(()=>{this.error=""},5000)
    }
 })
}



}
