import { createReducer, on } from "@ngrx/store"
import { addItemToCart } from "./cart.actions"
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils"
import { restoreStateFromLocalStorage } from "../app.actions"

const initialState = {
    cart: [],
}

export const CartReducer = createReducer(
    initialState,

    on(addItemToCart, (state, action) => {
        console.log('CartReducer.product', action.item)
        const existingItem = state.cart?.find(item => item.product._id === action.item.product._id)

        if(existingItem) {
            existingItem.quantity++;
        } else {
            state.cart.push(action.item)
        }
        console.log('CartReducer.state', state)

        saveStateToLocalStorage(state);

        return {
        ...state,    
        };
    }),

    on(restoreStateFromLocalStorage, (state, action) => {
        if(action.hdepot?.cart) {
            state.cart = action.hdepot?.cart
            console.log('action.hdepot?.cart', action.hdepot?.cart)
        } else {
            state = initialState;
            console.log('state.cart', state.cart)
        }
    
        return {
          ...state
        }
      }),
)