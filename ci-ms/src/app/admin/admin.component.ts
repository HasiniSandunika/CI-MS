import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  hours = [
    {"id": 0, "name": "Select Hours"}, {"id": 1, "name": "1"}, {"id": 2, "name": "2"}, {"id": 3, "name": "3"}
    ,{"id": 4, "name": "4"}, {"id": 5, "name": "5"}, {"id": 6, "name": "6"}, {"id": 7, "name": "7"}
    ,{"id": 8, "name": "8"}, {"id": 9, "name": "9"}, {"id": 10, "name": "10"}, {"id": 11, "name": "11"}
    ,{"id": 12, "name": "12"}, {"id": 13, "name": "13"}, {"id": 14, "name": "14"},{"id": 15, "name": "15"}
    ,{"id": 16, "name": "16"}, {"id": 17, "name": "17"}, {"id": 18, "name": "18"}, {"id": 19, "name": "19"}
    ,{"id": 20, "name": "20"}, {"id": 21, "name": "21"}, {"id": 22, "name": "22"}, {"id": 23, "name": "23"}
    ,{"id": 24, "name": "24"}];
  minutes = [
    {"id": 0, "name": "Select Minutes"}, {"id": 1, "name": "1"}, {"id": 2, "name": "2"}, {"id": 3, "name": "3"}
    ,{"id": 4, "name": "4"}, {"id": 5, "name": "5"}, {"id": 6, "name": "6"}, {"id": 7, "name": "7"}
    ,{"id": 8, "name": "8"}, {"id": 9, "name": "9"}, {"id": 10, "name": "10"}, {"id": 11, "name": "11"}
    ,{"id": 12, "name": "12"}, {"id": 13, "name": "13"}, {"id": 14, "name": "14"},{"id": 15, "name": "15"}
    ,{"id": 16, "name": "16"}, {"id": 17, "name": "17"}, {"id": 18, "name": "18"}, {"id": 19, "name": "19"}
    ,{"id": 20, "name": "20"}, {"id": 21, "name": "21"}, {"id": 22, "name": "22"}, {"id": 23, "name": "23"}
    ,{"id": 24, "name": "24"}, {"id": 25, "name": "25"}, {"id": 26, "name": "26"}, {"id": 27, "name": "27"}
    ,{"id": 28, "name": "28"}, {"id": 29, "name": "29"}, {"id": 30, "name": "30"}, {"id": 31, "name": "31"}
    ,{"id": 32, "name": "32"}, {"id": 33, "name": "33"}, {"id": 34, "name": "34"}, {"id": 35, "name": "35"}
    ,{"id": 36, "name": "36"}, {"id": 37, "name": "37"}, {"id": 38, "name": "38"}, {"id": 39, "name": "39"}
    ,{"id": 40, "name": "40"}, {"id": 41, "name": "41"}, {"id": 42, "name": "42"}, {"id": 43, "name": "43"}
    ,{"id": 44, "name": "44"}, {"id": 45, "name": "45"}, {"id": 46, "name": "46"}, {"id": 47, "name": "47"}
    ,{"id": 48, "name": "48"}, {"id": 49, "name": "49"}, {"id": 50, "name": "50"}, {"id": 51, "name": "51"}
    ,{"id": 52, "name": "52"}, {"id": 53, "name": "53"}, {"id": 54, "name": "54"}, {"id": 55, "name": "55"}
    ,{"id": 56, "name": "56"}, {"id": 57, "name": "57"}, {"id": 58, "name": "58"}, {"id": 59, "name": "59"}
    ,{"id": 60, "name": "60"}];
    model!: NgbDateStruct;
    ddlSelectFromHours: number=0;
    ddlSelectFromMinutes: number=0;
    ddlSelectToHours: number=0;
    ddlSelectToMinutes: number=0;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendMails(){
    console.log(this.model.year+'-'+this.model.month+'-'+this.model.day+' date');
    console.log(this.ddlSelectFromHours+' ddlSelectFromHours');
    console.log(this.ddlSelectFromMinutes+' ddlSelectFromMinutes');
    console.log(this.ddlSelectToHours+' ddlSelectToHours');
    console.log(this.ddlSelectToMinutes+' ddlSelectToMinutes');
  }

  cancelMails(){
    this.router.navigate(['/home']);
  }

}
