import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient) { }

  create(notif:any)
  {
   return this.http.post<any>(`${environment.apiUrl}/notification/create`,notif)
  }
  getPatientNotification(patientId:string)
  {
  return this.http.get<any>(`${environment.apiUrl}/notification/getNotificationsByReciever/${patientId}`)
 }
}
