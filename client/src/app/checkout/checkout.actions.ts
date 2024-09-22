import { createAction, props } from '@ngrx/store';
import { ICheckoutModel } from './checkout.model';

export const storeCheckoutData = createAction(
  '[storeCheckoutData] storeCheckoutData',
  props<{ checkoutData:ICheckoutModel }>()
);
