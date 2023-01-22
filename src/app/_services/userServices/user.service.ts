import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) {}


getAllDoctors():Observable<any>
{return this.http.get<any>(`${environment.apiUrl}/doctor/getAll`)}
// getDoctorById
getDoctorById(id:any)
{return this.http.get<any>(`${environment.apiUrl}/doctor/getDoctorById/${id}`)}

// getPatientById
getPatientById(id:any)
{return this.http.get<any>(`${environment.apiUrl}/patient/getPatientById/${id}`)}

//comment on doctor
comment(avis:any,id:any)
{return this.http.put<any>(`${environment.apiUrl}/doctor/commenter/${id}`,avis)}

// updateDoctorProfile
updateDoctorProfile(newProfile:any,id:any)
{return this.http.put<any>(`${environment.apiUrl}/doctor/updateDoctorProfile/${id}`,newProfile)}

//updatePatientProfile
updatePatientProfile(newProfile:any,id:any)
{return this.http.put<any>(`${environment.apiUrl}/user/updatePatientProfile/${id}`,newProfile)}

// updateUserImage
updateProfilePicture(image:any,id:any)
{return this.http.put<any>(`${environment.apiUrl}/user/updateProfilePicture/${id}`,image)}

//add patient to doctor
addPatient(id_doctor:any,id_patient:any)
{return this.http.put<any>(`${environment.apiUrl}/doctor/addPatient/${id_doctor}`,id_patient)}

//remove patient from  doctor patients list
removePatient(id_doctor:any,id_patient:any)
{return this.http.put<any>(`${environment.apiUrl}/doctor/removePatient/${id_doctor}`,id_patient)}
//get doctor patients
getDoctorPatients(id_doctor:any)
{return this.http.get<any>(`${environment.apiUrl}/doctor/getDoctorPatients/${id_doctor}`).pipe(map((value)=>{return value.data}))as Observable<any>;}


getFirstPatient(id_doctor:any)
{
  return this.http.get<any>(`${environment.apiUrl}/doctor/getFirstPatient/${id_doctor}`);
}

}