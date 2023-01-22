import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

constructor(private http :HttpClient) { }

  DoctorRegister(doctor:any)
{
  console.log(doctor)
  return this.http.post<any>(`${environment.apiUrl}/doctor/register`, doctor)
}
PatientRegister(patient:any)
{
  return this.http.post<any>(`${environment.apiUrl}/patient/register`, patient)
}
}
