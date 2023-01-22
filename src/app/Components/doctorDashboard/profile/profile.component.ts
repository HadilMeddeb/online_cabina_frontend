import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidation, tarifValidation } from 'src/app/_helpers/customValidators/mustMatch';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { UserService } from 'src/app/_services/userServices/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser:any
  updateForm !:FormGroup
  updateImageForm !:FormGroup
  submitted=false
  successMessage=""
  errorMessage=""
  uploadForm!:FormGroup
  photoSubmit=false
  id_currentUser=""
  constructor(private authenticationService: AuthenticationService,
              private formBuilder:FormBuilder,
              private userService:UserService) {
              this.id_currentUser=this.authenticationService.getCurrentUser()._id
              }


   onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file :",file)
      this.uploadForm.get('image')!.setValue(file);
      console.log("image : ",this.uploadForm.get('image'))
    }}

    onSubmit()
    {
      this.submitted=true
     if(this.updateForm.valid)
     {
      this.userService.updateDoctorProfile(this.updateForm.value,this.currentUser._id).subscribe({
        next:(data:any)=>{
          this.authenticationService.updateStorage(data.data)
          this.ngOnInit()
          console.log("updated doctor",data.data)
          this.successMessage="profile updated successfully "
          setTimeout(()=>{this.successMessage=""},3000)
         },
           error:(err)=>{
             console.log("err: ",err)
             this.errorMessage="error in updating :"+err
             setTimeout(()=>{this.errorMessage=""},3000)
            }
         })
     }
    }
   

    updatePhoto() {
      this.photoSubmit=true
      const formData = new FormData();
      formData.append('image', this.uploadForm.get('image')!.value);
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

  get fim()
  {return this.uploadForm.controls}
   


  ngOnInit(): void {
  this.currentUser=this.authenticationService.getCurrentUser()
    // this.userService.getDoctorById(this.id_currentUser).subscribe({
    //   next:(data)=>{this.currentUser=data.data},
    //   error:(err)=>{console.log("error :",err)}
    // })
    console.log("fffffffffffff",this.currentUser)
  this.updateForm=this.formBuilder.group({
    email: [this.currentUser.email,[Validators.email]],
    first_name: [this.currentUser.first_name,[Validators.minLength(3)]],  
    last_name: [this.currentUser.last_name,[Validators.minLength(3)]], 
    adressLocal: [this.currentUser.adressLocal,[Validators.minLength(20)]],  
    speciality: [this.currentUser.speciality,[Validators.minLength(6)]], 
    professionnal_career: [this.currentUser.professionnal_career,[Validators.minLength(100)]],
    tarif: [this.currentUser.tarif,[,tarifValidation(300)]]
  })

   this.uploadForm=this.formBuilder.group({
     image:["",[Validators.required]]
   })

  }


}
