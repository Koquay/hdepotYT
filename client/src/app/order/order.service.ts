import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = '/api/orders'

  constructor(
    private httpClient: HttpClient,
    private toastr:ToastrService
  ) { }

  public placeOrder = (orderData) => {

    this.httpClient.post(this.url, orderData).pipe(
      tap(order => {
        console.log('new order', order)
        this.toastr.success('Order successfully placed.', 'Place Order')
      }),
      catchError(error => {
        console.log('error', error)
        this.toastr.success('Problem placing order.', 'Place Order');
        throw error;
      }) 
    ).subscribe()
  } 
}
