import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { ArrivalComponent } from './customer/record/arrival.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LeaveComponent } from './customer/update/leave.component';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrivalComponent,
    AdminComponent,
    HomeComponent,
    LeaveComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    NgQrScannerModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'arrival', component: ArrivalComponent },
      { path: 'leave', component: LeaveComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
