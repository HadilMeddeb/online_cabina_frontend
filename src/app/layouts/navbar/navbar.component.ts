import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { AlertService } from 'src/app/_services/alert/alert.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,
              private router:Router,
              private  alertService:AlertService
             ) { }

  ngOnInit(): void {

  }

  logout()
  {
    console.log("logout !!")
    this.authenticationService.logout()
  }
  loggedIn()
  {
    return this.authenticationService.loggedIn()
  }
  
  getCurrentUser()
  {
    return this.authenticationService.getCurrentUser()
  }

  redirect()
  {
    this.authenticationService.redirect();
  }
  redirectProfile()
  {
    switch(this.authenticationService.getCurrentUserRole())
    {
      case "Doctor":{this.router.navigate(["/doctorDashboard/profile"]);break;}
      case "Patient":{this.router.navigate(["/patientDashboard/profile"]);break};
      default :{this.router.navigate(["/welcome"]);break};
      
  }
  }

}
