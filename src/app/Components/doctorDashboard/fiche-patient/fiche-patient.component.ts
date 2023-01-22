import { AfterViewInit, Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { FicheSanitaireService } from 'src/app/_services/ficheSanitaire/fiche-sanitaire.service';
import { UserService } from 'src/app/_services/userServices/user.service';

@Component({
  selector: 'app-fiche-patient',
  templateUrl: './fiche-patient.component.html',
  styleUrls: ['./fiche-patient.component.css']
})
export class FichePatientComponent implements OnInit {
  panelOpenState = false;
  updateForm!:FormGroup;
  consultationForm!:FormGroup;
  patient_Id:any;
  patient:any;
  fiche:any;
  submitted=false
  routeSubscription:Subscription|undefined
  constructor(private formBuilder:FormBuilder,
              private route: ActivatedRoute,
              private userService:UserService,
              private ficheService:FicheSanitaireService,
              private authenticationService : AuthenticationService) {
              this.consultationForm=this.formBuilder.group({
              remarqs:['',[Validators.required ]]    
              })
            }

AddRemarq()
{
  this.submitted=true
  if(this.consultationForm.valid)
  {
    this.ficheService.addConsultation(this.fiche._id,this.consultationForm.value).subscribe({
      next:(data)=>{
        console.log("fiche updated",data.data)
        this.ngOnInit()
     },
     error:(err)=>{
        console.log("errr adding new consultation :",err)
     }
    })
  }
}

  ngOnInit(){
  this.patient_Id = this.route.snapshot.paramMap.get('patientId');  
  //get  Patient By Id
  console.log("patient id ", this.patient_Id)
  console.log("doctor",this.authenticationService.getCurrentUser()._id)
  this.userService.getPatientById(this.patient_Id).subscribe({
    next:(data)=>{
       this.patient=data.data
    },
    error:(err)=>{
       console.log("errr getting patient :",err)
    }
  })
    // getFiche Sanitaire by Patient and Doctor
   this.fiche= this.ficheService.ficheSanitaireByIdPatientAndDoctor(this.patient_Id,this.authenticationService.getCurrentUser()._id).subscribe({
      next:(data)=>{
         this.fiche=data.data
      },
      error:(err)=>{
         console.log("errr getting fiche :",err)
      }
    })
}


  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  onSubmit()
  {
    console.log("helllllo")
  }
}
