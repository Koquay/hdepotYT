import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ICheckoutModel } from './checkout.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderSummaryComponent } from '../order/order-summary/order-summary.component';
import { storeCheckoutData } from './checkout.actions';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    OrderSummaryComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  public cart;
  public checkoutData:ICheckoutModel;
  public APPLIANCE_DELIVERY = 29.99;
  public expirationMonths;
  public expirationYears;

  constructor(
    private store:Store<{cartReducer, checkoutReducer}>,
    private orderService:OrderService,
    private toastr: ToastrService,
  ){}

  ngOnInit() {
    this.subscribeToRedux();        
  }

  private subscribeToRedux = () => {
    const checkoutReducer$ = this.store.select((state) => {
      return state.checkoutReducer;
    });

    checkoutReducer$.subscribe((checkoutReducer:any) => {
        this.checkoutData = JSON.parse(JSON.stringify(checkoutReducer?.checkoutData))        
        console.log('this.checkoutData 2', this.checkoutData);
            
      this.expirationMonths = checkoutReducer?.expirationMonths;
      this.expirationYears = checkoutReducer?.expirationYears;

      console.log('CheckoutComponent.checkoutData', this.checkoutData)
      console.log('CheckoutComponent.expirationMonths', this.expirationMonths)
      console.log('CheckoutComponent.expirationYears', this.expirationYears)
    });

    const cartReducer$ = this.store.select((state) => {
      return state.cartReducer;
    });

    cartReducer$.subscribe((cartReducer:any) => {
      this.cart = cartReducer?.cart;
      console.log('CheckoutComponent.cart', this.cart)
    });
  }

  public saveToDataStore = () => {
    this.store.dispatch(storeCheckoutData({checkoutData: this.checkoutData}))
  }

  public placeOrder = () => {    
    const hdepot = localStorage.getItem('hdepot');
    let token = null;

    if(hdepot) {
      token = JSON.parse(hdepot).user.token;
    }

    console.log('token', token)

    if(!token) {
      this.toastr.warning('Please sign in to place an order.', '');
      return;
    }    

    const items = [];

    for(let item of this.cart) {
      items.push (
         {
          product: item.product._id,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        }
      )
    }

    this.checkoutData.items = items;
    console.log('CheckoutComponent.checkoutData 2', this.checkoutData)
    this.orderService.placeOrder(this.checkoutData)
  }
}
