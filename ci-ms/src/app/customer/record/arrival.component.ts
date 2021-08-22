import {Component, ViewChild, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Subscription } from 'rxjs';
import { ArrivalService } from './service/arrival.service';

@Component({
  selector: 'app-arrival',
  templateUrl: './arrival.component.html',
  styleUrls: ['./arrival.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArrivalComponent implements OnInit, OnDestroy {

  title = 'f-project';
  private subscriber!: Subscription;
    
  @ViewChild(QrScannerComponent, { static: false }) qrScannerComponent!: QrScannerComponent;

  constructor(private arrivalService: ArrivalService) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void{
    this.qrScannerComponent.getMediaDevices().then(devices => {
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
                  choosenDev = dev;
                  break;
              }
          }
          if (choosenDev) {
              this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
      }
    });
  
    this.subscriber=this.qrScannerComponent.capturedQr.subscribe(result => {
      var today = new Date(); 
      var day=today.getDate().toString();
      var month=(today.getMonth()+1).toString();
      if(today.getDate()<10){
        day = '0'+ today.getDate().toString();
      }
      if((today.getMonth()+1)<10){
        month = '0'+(today.getMonth()+1).toString();
      }
      var date = day+'/'+ month+'/'+today.getFullYear();
      var arrival = today.getHours()  + today.getMinutes()/100;
      const saveRecordDTO = {
        customerId: result,
        date: date, 
        arrival: arrival, 
        leave: 0, 
        isContact: 0
      }
      console.log(`customerId: ${result}`);
      this.subscriber=this.arrivalService.saveRecord(saveRecordDTO).subscribe({
        next: resp =>{
          if(resp!=null){
            console.log(`customerId: ${resp.customerId}`);
            console.log(`date: ${resp.date}`);
            console.log(`arrival: ${resp.arrival}`);
            console.log(`leave: ${resp.leave}`);
            console.log(`isContact: ${resp.isContact}`);
            alert(`Successfully recorded the arrive.`);
          }
          else{
            alert(`Cannot enter, Please check your mails!`);
          }
          location.reload();
        },
        error: error => {
          alert(`An error ocurred while recording: ${error.message}`);
          location.reload();
        }
      });
    });
  }

  ngOnDestroy(){
    if(this.subscriber!=undefined){
      this.subscriber.unsubscribe();
    }    
  }
  
}
