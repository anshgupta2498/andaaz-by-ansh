import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(public router:Router) { }
  order_id:any = ''
  ngOnInit(): void {
   this.order_id = localStorage.getItem('order_id');
  }

}
