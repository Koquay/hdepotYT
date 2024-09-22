import { ActionReducerMap } from "@ngrx/store";
import { HomeReducer } from "../../home/home.reducer";
import { ProductReducer } from "../../product/product.reducer";
import { CartReducer } from "../../cart/cart.reducer";
import { CheckoutReducers } from "../../checkout/checkout.reducer";
import { UserReducer } from "../../user/user.reducer";
import { ProductSidebarReducer } from "../../product/product-sidebar/product-sidebar.reducer";

export interface State {};

export const reducers: ActionReducerMap <State> = {
    homeReducer:HomeReducer,
    productReducer:ProductReducer,
    cartReducer:CartReducer,
    checkoutReducer:CheckoutReducers,
    userReducer:UserReducer,
    productSidebarReducer:ProductSidebarReducer,
    
}