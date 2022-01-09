import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOrderComponent } from './orders-order.component';

describe('OrdersOrderComponent', () => {
  let component: OrdersOrderComponent;
  let fixture: ComponentFixture<OrdersOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
