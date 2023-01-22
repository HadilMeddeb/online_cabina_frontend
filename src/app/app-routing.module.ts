import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './Components/doctorDashboard/doctor-dashboard/doctor-dashboard.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { PatientDashboardComponent } from './Components/patient-dashboard/patient-dashboard.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { ResetPasswordComponent } from './Components/auth/reset-password/reset-password.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { AuthGuard } from './_helpers/guards/auth/auth.guard';
import {DoctorDashboardGuard} from './_helpers/guards/doctorDashboard/doctor-dashboard.guard'
import { AccepteComponent } from './Components/doctorDashboard/demandes/accepte/accepte.component';
import { EnAttenteComponent } from './Components/doctorDashboard/demandes/en-attente/en-attente.component';
import { RefuseComponent } from './Components/doctorDashboard/demandes/refuse/refuse.component';
import { PatientsComponent } from './Components/doctorDashboard/patients/patients.component';
import { ProfileComponent } from './Components/doctorDashboard/profile/profile.component';
import { DoctorProfileComponent } from './Components/doctor-profile/doctor-profile.component';
import { patientProfileComponent } from './Components/patient-dashboard/profile/profile.component';
import { FichePatientComponent } from './Components/doctorDashboard/fiche-patient/fiche-patient.component';
import { ChatComponent } from './Components/Chat/chat/chat.component';
import { DoctorsComponent } from './Components/patient-dashboard/doctors/doctors.component';
import { NotificationsComponent } from './Components/patient-dashboard/notifications/notifications.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent  },
  { path: '', redirectTo: "/welcome", pathMatch: 'full'},
  { path: 'patientDashboard', component: PatientDashboardComponent,canActivate:[AuthGuard],children: [
    { path: 'profile', component: patientProfileComponent },
    { path: 'chat/:roomId', component: ChatComponent },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'notifications', component: NotificationsComponent }
  
  ] },
  { path: 'doctorProfile/:id', component: DoctorProfileComponent },
  { path: 'doctorDashboard', component: DoctorDashboardComponent ,canActivate:[DoctorDashboardGuard] ,children: [
    { path: 'chat/:roomId', component: ChatComponent },
    { path: 'accepte', component: AccepteComponent },
    { path: 'refuse', component: RefuseComponent },
    { path: 'attente', component: EnAttenteComponent },
    { path: 'patients', component: PatientsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'patients/fichePatient/:patientId', component: FichePatientComponent }
  ]},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
