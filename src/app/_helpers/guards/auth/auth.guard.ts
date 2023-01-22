import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../_services/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }
  
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this.authenticationService.loggedIn()) {
      return true;}
  else
  {
    console.log("redirected")
    this.router.navigate(['/login'])
    return false
  }}  
}
