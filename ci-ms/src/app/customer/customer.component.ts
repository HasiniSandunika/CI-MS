import {Component, ViewChild, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerComponent implements OnInit, OnDestroy {

    title = 'f-project';
    private subscriber!: Subscription;
  constructor() { }
    
  @ViewChild(QrScannerComponent, { static: false }) qrScannerComponent!: QrScannerComponent;

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void{
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
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
      console.log(result+' @@@@@@@@@ '+ new Date().getDate,  new Date().getTime);
      alert(`Successfully logged in`);
      location.reload();
  });
  }

  ngOnDestroy(){
    if(this.subscriber!=undefined){
      this.subscriber.unsubscribe();
    }    
  }
  
}
