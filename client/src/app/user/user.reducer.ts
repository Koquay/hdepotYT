import { createReducer, on } from "@ngrx/store";
import { StoreUser } from "./user.actionls";
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils";
import { restoreStateFromLocalStorage } from "../app.actions";

const initialState = {
    user: {
      cart: []
    },
    
  };
  
  export const UserReducer = createReducer(
    initialState,
    on(StoreUser, (state, action) => {
      console.log('action.user', action.user);
  
      state = {
        ...state,
        user: { ...action.user },
      };
  
      saveStateToLocalStorage(state);
  
      return {
        ...state,
      };
    }),

    on(restoreStateFromLocalStorage, (state, action) => {
      if(action.hdepot?.user) {
        state.user = action.hdepot?.user
        console.log('action.hdepot?.user', action.hdepot?.user)
    } else {
        state = initialState;
        console.log('state.user', state.user)
    }
  
      return {
        ...state
      }
    }),
  )  