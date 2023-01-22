import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-get-demand-details',
  templateUrl: './get-demand-details.component.html',
  styleUrls: ['./get-demand-details.component.css']
})
export class GetDemandDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit(): void {
  }

}
