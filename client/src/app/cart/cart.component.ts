import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DiscountPricePipe } from '../shared/pipes/discount-price.pipe';
import { OrderSummaryComponent } from '../order/order-summary/order-summary.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DiscountPricePipe,
    OrderSummaryComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public cart;
  public APPLIANCE_DELIVERY = 29.99;

  constructor(
    private store:Store<{cartReducer}>
  ){}

  ngOnInit() {    
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {

    const productReducers$ = this.store.select((state) => {
      return state.cartReducer;
    });

    productReducers$.subscribe((cartReducer:any) => {
      this.cart = cartReducer.cart;
      console.log('CartComponent.cart', this.cart)
    });
  }
}
