import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DoctorDashboardComponent } from 'src/app/Components/doctorDashboard/doctor-dashboard/doctor-dashboard.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  // Demand Appointment
  demanderAppointment(demande:any){return this.http.post<any>(`${environment.apiUrl}/demandeAppointment/create`,demande)}
  getDemandeAppointment(demande:any){return this.http.post<any>(`${environment.apiUrl}/demandeAppointment/getAppointmentDemandes`,demande)}
  deleteDemande(id:any)  {return this.http.delete<any>(`${environment.apiUrl}/demandeAppointment/deleteDemande/${id}`)}
  updateDemandeAppointmentStatus(id:any){return this.http.put<any>(`${environment.apiUrl}/DemandeAppointment/update/:${id}`,id)} 
  DemandAppointmentByPatientID(id:any) 
  {return this.http.get<any>(`${environment.apiUrl}/demandeAppointment/DemandAppointmentByPatientID/${id}`)}
  validateDemande(id:any,date:any){return this.http.put<any>(`${environment.apiUrl}/demandeAppointment/validateDemand/${id}`,{date:date})}
  
  
  // Appointment
  createAppointment(appointment:any){return this.http.post<any>(`${environment.apiUrl}/appointment/create`,appointment)}
  getAppointment_ByAssociatedDemand(associateDemand_id:any){return this.http.get(`${environment.apiUrl}/appointment/getByAssociatedDemand/${associateDemand_id}`)}
  getAppointments_ByDoctor(doctor:any){return this.http.get(`${environment.apiUrl}/appointment/getAppointmentsByDoctor/${doctor}`)}
  getAppointments_ByPatient(patient:any){return this.http.get(`${environment.apiUrl}/appointment/getAppointmentsByPatient/${patient}`)}
  getDoctorsByPatient(patient:any){return this.http.get(`${environment.apiUrl}/appointment/getAppointmentsByPatient/${patient}`)
  .pipe(map((val:any)=>{
    console.log("valllllll",val)
    let doctors:any[]=[]
   val.data.map((value:any)=>{
     if (!doctors.includes(value.doctor))
     {
       doctors.push(value.doctor)     }
   })
    return doctors
   }))}
}
