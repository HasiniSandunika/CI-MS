import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  hours = [ {"id": -1, "name": "Select Hours"},
    {"id": 0, "name": "00"}, {"id": 1, "name": "01"}, {"id": 2, "name": "02"}, {"id": 3, "name": "03"}
    ,{"id": 4, "name": "04"}, {"id": 5, "name": "05"}, {"id": 6, "name": "06"}, {"id": 7, "name": "07"}
    ,{"id": 8, "name": "08"}, {"id": 9, "name": "09"}, {"id": 10, "name": "10"}, {"id": 11, "name": "11"}
    ,{"id": 12, "name": "12"}, {"id": 13, "name": "13"}, {"id": 14, "name": "14"},{"id": 15, "name": "15"}
    ,{"id": 16, "name": "16"}, {"id": 17, "name": "17"}, {"id": 18, "name": "18"}, {"id": 19, "name": "19"}
    ,{"id": 20, "name": "20"}, {"id": 21, "name": "21"}, {"id": 22, "name": "22"}, {"id": 23, "name": "23"}
    ,{"id": 24, "name": "24"}];
  minutes = [ {"id": -1, "name": "Select Minutes"},
    {"id": 0, "name": "00"}, {"id": 1, "name": "01"}, {"id": 2, "name": "02"}, {"id": 3, "name": "03"}
    ,{"id": 4, "name": "04"}, {"id": 5, "name": "05"}, {"id": 6, "name": "06"}, {"id": 7, "name": "07"}
    ,{"id": 8, "name": "08"}, {"id": 9, "name": "09"}, {"id": 10, "name": "10"}, {"id": 11, "name": "11"}
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
    ddlSelectFromHours: number=-1;
    ddlSelectFromMinutes: number=-1;
    ddlSelectToHours: number=-1;
    ddlSelectToMinutes: number=-1;
    private subscriber!: Subscription;

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.subscriber!=undefined){
      this.subscriber.unsubscribe();
    }    
  }

  sendMails(){
    if(this.checkInput() == 1){
      var day = this.model.day.toString();
    var month = this.model.month.toString();
    if(this.model.day<10){
      day = '0'+ this.model.day.toString();
    }
    if(this.model.month<10){
      month = '0'+this.model.month.toString();
    }
    var date = day+'/'+month+'/'+this.model.year; 
    var from = this.ddlSelectFromHours + (this.ddlSelectFromMinutes/100);
    var to = this.ddlSelectToHours + (this.ddlSelectToMinutes/100);
    const sendMailsDTO = {
      date: date,
      from: from,
      to: to
    }
    console.log(`date: ${date}`);
    console.log(`from: ${from}`);
    console.log(`to: ${to}`);
    this.subscriber=this.adminService.sendMails(sendMailsDTO).subscribe({
      next: resp =>{
        if(resp){
          alert(`Successfully sent mails to first contacts.`);
          this.router.navigate(['/home']);
        }
        else{
          alert(`An error ocurred while sending. Please try again!`);
        }
        console.log(`mail sent: ${resp}`);
      },
      error: error => {
        alert(`An error ocurred while sending: ${error.message}`);
      }
    });
    }
    else if(this.checkInput() == 0){
      alert(`Fill necessary feilds before send.`);
    }
    else{
      alert(`Please check the selected time gap before send.`);
    }
  }

  checkInput(){
    var status = 0;
    if(this.model != undefined && this.ddlSelectFromHours != -1 && this.ddlSelectFromMinutes != -1
      && this.ddlSelectToHours != -1 && this.ddlSelectToMinutes != -1){
        var from = this.ddlSelectFromHours + (this.ddlSelectFromMinutes/100);
        var to = this.ddlSelectToHours + (this.ddlSelectToMinutes/100);
        if(to > from){
          status = 1;
        }
        else{
          status =-1;
        }
    }
    return status;
  }

  cancelMails(){
    this.router.navigate(['/home']);
  }

}
