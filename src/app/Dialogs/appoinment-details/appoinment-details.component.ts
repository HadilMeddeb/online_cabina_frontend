import { Component, OnInit ,Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-appoinment-details',
  templateUrl: './appoinment-details.component.html',
  styleUrls: ['./appoinment-details.component.css']
})
export class AppoinmentDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data:any) { }
  datas:any
  ngOnInit(): void {
    this.datas=this.data
    console.log("datas :",this.datas)
  }

}
