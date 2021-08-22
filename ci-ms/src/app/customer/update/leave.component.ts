import {Component, ViewChild, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Subscription } from 'rxjs';
import { LeaveService } from './service/leave.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeaveComponent implements OnInit, OnDestroy {

  title = 'f-project';
  private subscriber!: Subscription;
    
  @ViewChild(QrScannerComponent, { static: false }) qrScannerComponent!: QrScannerComponent;

  constructor(private leaveService: LeaveService) { }

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
      var leave = today.getHours()  + today.getMinutes()/100;
      const updateRecordDTO = {
        customerId: result,
        leave: leave, 
      }
      console.log(`customerId: ${result}`);
      this.subscriber=this.leaveService.updateRecord(updateRecordDTO).subscribe({
        next: resp =>{
          console.log(`customerId: ${resp.customerId}`);
          console.log(`date: ${resp.date}`);
          console.log(`arrival: ${resp.arrival}`);
          console.log(`leave: ${resp.leave}`);
          console.log(`isContact: ${resp.isContact}`);
          alert(`Successfully recorded the leave.`);
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
