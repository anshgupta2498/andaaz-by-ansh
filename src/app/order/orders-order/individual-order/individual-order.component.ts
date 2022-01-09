import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-order',
  templateUrl: './individual-order.component.html',
  styleUrls: ['./individual-order.component.css']
})
export class IndividualOrderComponent implements OnInit {
  @Input() item:any
  @Input() order_id:any
  
  constructor() { }

  ngOnInit(): void {
  }

}
