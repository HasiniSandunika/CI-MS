import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'CIS - Covid Inform System';

  ngOnInit(): void {
  }
  
}  

