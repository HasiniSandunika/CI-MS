import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AdminComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgQrScannerModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'customer', component: CustomerComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  //exports: [AdminComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
