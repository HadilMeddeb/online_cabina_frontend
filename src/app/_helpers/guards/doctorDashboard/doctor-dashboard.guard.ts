import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../_services/auth/authentication.service';
import {AlertService} from "../../../_services/alert/alert.service"

@Injectable({
  providedIn: 'root'
})
export class DoctorDashboardGuard implements CanActivate {
  constructor(private authenticationService:AuthenticationService,
              private router :Router,
              private alertService : AlertService){}
  canActivate( route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.loggedIn()&&this.authenticationService.getCurrentUserRole()=="Doctor") {
      return true;}
  else
  {
    console.log("redirected unauthorized")
    this.alertService.openSnackBar("unauthorized","close")
    this.router.navigate(['/welcome'])
    return false
  }}  
}
