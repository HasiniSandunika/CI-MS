import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

    constructor(private router: Router) { }
  
    ngOnInit(): void {
    }
  
    navigateArrival(){
      this.router.navigate(['/arrival']);
    }
  
    navigateLeave(){
      this.router.navigate(['/leave']);
    }
  }