import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import  jwt_decode from "jwt-decode";
import { AlertService } from '../alert/alert.service';
import { UserService } from '../userServices/user.service';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  current_user:any=null
  constructor(private router:Router ,
              private http: HttpClient,
              private alertService:AlertService,
              private userService:UserService) {
}


login(email: string, password: string) {
  let payload={email:email,password:password}
  return this.http.post<any>(`${environment.apiUrl}/auth/login`, payload)
}


logout() {
  // remove user from local storage to log user out
  sessionStorage.removeItem('Token');
  sessionStorage.removeItem('current_user');
  this.router.navigate(['welcome'])
}

decodeToken():any {
  let token=this.getToken()
  if (token) {
  let decodedToken = jwt_decode(token);
  console.log("decoded token  :",decodedToken) 
  return decodedToken;
  }
  else return null
}

isTokenExpired(): boolean {
  const expiryTime: any = this.getExpiryTime();
  if (expiryTime) {
    this.logout()
    this.router.navigate(['/login'])
    return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
  } else {
    return false;
  }
}

getExpiryTime() : any {
 const expiry=this.decodeToken().exp
  if(expiry)return expiry
  else return null
}

redirect()
{
  console.log("role :",this.getCurrentUserRole())
  if(!this.loggedIn())
  {
    this.alertService.openSnackBar("unauthorized get login first","close")
    this.router.navigate(["/login"])
    return
  }
  switch(this.getCurrentUserRole())
  {
    case "Doctor":{console.log("doctor");this.router.navigate(["/doctorDashboard"]);break;}
    case "Patient":{console.log("Patient");this.router.navigate(["/patientDashboard"]);break};
    default :{console.log("default");this.router.navigate(["/welcome"]);break};
    
}
}

loggedIn()
{
 if(sessionStorage.getItem('Token'))  
 return true
 else return false
}


getToken()
{const token=sessionStorage.getItem("Token")
  if(token)return token
  else return null
}

getCurrentUserRole()
{
  return this.getCurrentUser().__t
}

getCurrentUser()
{
  const user=sessionStorage.getItem('current_user')
  if(user)return JSON.parse(user)
  else return null
}
updateStorage(newUser:any)
{
  sessionStorage.setItem("current_user",JSON.stringify(newUser))
}

getDoctorWithDetails(id:any)
{
  this.userService.getDoctorById(id).subscribe({
    next:(data)=>{return data.data},
    error:(err)=>{return "error message : "+err}
  })
}





}
