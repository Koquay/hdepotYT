import { createReducer, on } from "@ngrx/store";
import { StoreSelectedProduct, StoreTopPickProducts } from "./product.actions";
import { StoreProducts } from "./product-sidebar/product-sidebar.actions";
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils";
import { restoreStateFromLocalStorage } from "../app.actions";


const initialState = {
    topPickProducts: [],
    selectedProduct: {},
    products: [],
    productCount: 0
}

export const ProductReducer = createReducer(
    initialState,

    on(StoreTopPickProducts, (state, action) => {
        console.log('productReducers.topPickProducts', action.products)

        state = {
            ...state,    
            topPickProducts: action.products
          };

        saveStateToLocalStorage(state);

        return {
        ...state,    
        };
    }),

    on(StoreSelectedProduct, (state, action) => {
        console.log('productReducers.selectedProductId', action.productId)

        state = {
            ...state,    
            selectedProduct: state.topPickProducts.find(product => product._id === action.productId)        
          };

        saveStateToLocalStorage(state);

        return {
        ...state
        };
    }),

    on(StoreProducts, (state, action) => {
        console.log('action.products', action.productData)
      return {
        ...state,
        products: action.productData.products,
        productCount: action.productData.productCount,
        
      };
    }),

    on(restoreStateFromLocalStorage, (state, action) => {          
        if(action.hdepot?.topPickProducts) {
            state.topPickProducts = action.hdepot?.topPickProducts
            console.log('action.hdepot?.topPickProducts', action.hdepot?.topPickProducts)
        } else {
            state = initialState;
            console.log('state.topPickProducts', state.topPickProducts)
        }

        if(action.hdepot?.selectedProduct) {
            state.selectedProduct = action.hdepot?.selectedProduct
            console.log('action.hdepot?.selectedProduct', action.hdepot?.selectedProduct)
        } else {
            state = initialState;
            console.log('state.selectedProduct', state.selectedProduct)
        }
            
        return {
          ...state
        }
      }),
)

