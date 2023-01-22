import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NavbarComponent } from './layouts/navbar/navbar.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { ResetPasswordComponent } from './Components/auth/reset-password/reset-password.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import{MaterialUiModule} from './material-ui/material-ui.module'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DoctorDashboardComponent } from './Components/doctorDashboard/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './Components/patient-dashboard/patient-dashboard.component'
import { AuthGuard } from './_helpers/guards/auth/auth.guard';
import { HeaderComponent } from './layouts/header/header.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AboutComponent } from './Components/about/about.component';
import { EnAttenteComponent } from './Components/doctorDashboard/demandes/en-attente/en-attente.component';
import { AccepteComponent } from './Components/doctorDashboard/demandes/accepte/accepte.component';
import { RefuseComponent } from './Components/doctorDashboard/demandes/refuse/refuse.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AppoinmentDetailsComponent } from './Dialogs/appoinment-details/appoinment-details.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PatientsComponent } from './Components/doctorDashboard/patients/patients.component';
import { ProfileComponent } from './Components/doctorDashboard/profile/profile.component';
import { DoctorProfileComponent } from './Components/doctor-profile/doctor-profile.component';
import { patientProfileComponent } from './Components/patient-dashboard/profile/profile.component';
import { GetAppointmentComponent } from './Components/get-appointment/get-appointment.component';
import { FichePatientComponent } from './Components/doctorDashboard/fiche-patient/fiche-patient.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { GetDemandDetailsComponent } from './Dialogs/get-demand-details/get-demand-details.component';
import { ChatComponent } from './Components/Chat/chat/chat.component';
import { DoctorsComponent } from './Components/patient-dashboard/doctors/doctors.component';
import { NotificationsComponent } from './Components/patient-dashboard/notifications/notifications.component'
@NgModule({
  entryComponents:[AppoinmentDetailsComponent],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    WelcomeComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    HeaderComponent,
    AboutComponent,
    EnAttenteComponent,
    AccepteComponent,
    RefuseComponent,
    AppoinmentDetailsComponent,
    PatientsComponent,
    ProfileComponent,
    DoctorProfileComponent,
    patientProfileComponent,
    GetAppointmentComponent,
    FichePatientComponent,
    GetDemandDetailsComponent,
    ChatComponent,
    DoctorsComponent,
    NotificationsComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialUiModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxMaterialTimepickerModule,
    ScrollingModule,
    NgxPaginationModule
  ],
  providers: [AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
