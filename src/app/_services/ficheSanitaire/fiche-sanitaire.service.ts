import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FicheSanitaireService {

  constructor(private http :HttpClient) { }

  //getficheanitaireByIdPatientAndDoctor
  ficheSanitaireByIdPatientAndDoctor(patientId:any,doctorId:any)
  {return this.http.get<any>(`${environment.apiUrl}/ficheSanitaire/getFicheByIdPatientAndDoctor/${patientId}/${doctorId}`)}


  //create fiche Sanitaire
  createFicheSanitaire(patient:any,doctor:any,description:any)
  {return this.http.post<any>(`${environment.apiUrl}/ficheSanitaire/create`,
   {patient:patient,
    doctor:doctor,
    illness_first_description:description
   }
  )}

  //add Consultation
  addConsultation(id_fiche:any,remarqs:any)
  {return this.http.put<any>(`${environment.apiUrl}/ficheSanitaire/addConsultation/${id_fiche}`,remarqs)}




}
