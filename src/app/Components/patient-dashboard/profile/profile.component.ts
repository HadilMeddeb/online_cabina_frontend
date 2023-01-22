import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { length, passwordValidation } from 'src/app/_helpers/customValidators/mustMatch';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { UserService } from 'src/app/_services/userServices/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class patientProfileComponent implements OnInit {

  currentUser:any
  updateForm !:FormGroup
  uploadForm !:FormGroup
  submitted=false
  successMessage=""
  errorMessage=""
  photoSubmit=false
  constructor(private authenticationService: AuthenticationService,
              private formBuilder:FormBuilder,
              private userService:UserService) {}

   onSubmit()
   {
     this.submitted=true
     if(this.updateForm.valid)
     {
       this.userService.updatePatientProfile(this.currentUser._id,this.updateForm.value).subscribe({
        next:(data)=>{
          this.authenticationService.updateStorage(data.data)
          this.successMessage="updated  successfully"
          console.log("data :",data)
           setTimeout(() => {this.successMessage="";this.submitted=false}, 5000);
        },
        error:(err)=>{
         this.errorMessage="error update :"+err
        console.log("error update :",err)
         setTimeout(() => {this.errorMessage="";this.submitted=false}, 5000);
        }
      })
     }
     console.log(this.updateForm.value)
   }

   updatePhoto() {
    this.photoSubmit=true
    const formData = new FormData();
    formData.append('image', this.uploadForm.get('image')!.value);
       console.log("image :",formData)
    if(this.uploadForm.valid)
    {
      this.userService.updateProfilePicture(formData,this.currentUser._id).subscribe({
        next:(data)=>{
          this.successMessage="updated  successfully"
          console.log("data :",data)
           setTimeout(() => {this.successMessage="";this.photoSubmit=false}, 5000);
           this.authenticationService.updateStorage(data.data)
        },
        error:(err)=>{
         this.errorMessage="error update :"+err
        console.log("error update photo :",err)
         setTimeout(() => {this.errorMessage="";this.photoSubmit=false}, 5000);
        }})
        
    }
    
    }

   get f()
   {return this.updateForm.controls}

   get fim()
   {return this.uploadForm.controls}


   onFileSelect(event:any) {
     console.log("rrrrrr")
    if (event.target.files.length > 0) {
      console.log("file :",event.target.files[0])
      const file = event.target.files[0];
      this.uploadForm.get('image')!.setValue(file);
    }}

 

  ngOnInit(): void {
  this.currentUser=this.authenticationService.getCurrentUser()
  this.updateForm=this.formBuilder.group({
    email: [this.currentUser.email,[Validators.email]],
    first_name: [this.currentUser.first_name,[Validators.minLength(3)]], 
    last_name: [this.currentUser.last_name,[Validators.minLength(3)]], 
    cin: [this.currentUser.cin,[Validators.minLength(3),Validators.required,length(8)]], 
    
  })

    this.uploadForm=this.formBuilder.group({
    image:[""]
})
  
}



}
