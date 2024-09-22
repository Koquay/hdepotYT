import { createReducer, on } from '@ngrx/store';
import {
  ProcessChange,
} from './product-sidebar.actions';
import { saveStateToLocalStorage } from '../../shared/utils/localStorageUtils';
import { restoreStateFromLocalStorage } from '../../app.actions';

const initialState = {
  productSidebar: {
    pageNo: 1,
    pageSize: 8,
    pageSizeOptions: [5, 10, 15],

    brands: {
        title: 'Brands',
        brands: [
            {
              name: 'GE',
              checked: false,
            },
            {
              name: 'Whirlpool',
              checked: false,
            },
            {
              name: 'Frigidaire',
              checked: false,
            },
            {
              name: 'Samsung',
              checked: false,
            },
            {
              name: 'LG',
              checked: false,
            },
          ],
    },
    
    priceFilter: {
      title: 'Price',
      priceRange: [
        {
          range: { low: 1, high: 500 },
          label: 'Under $500',
          checked: false,
        },
        {
          range: { low: 500, high: 700 },
          label: '$500 - $700',
          checked: false,
        },
        {
          range: { low: 700, high: 900 },
          label: '$700 - $900',
          checked: false,
        },
        {
            range: { low: 900, high: 1100 },
            label: '$900 - $1100',
            checked: false,
          },
          {
            range: { low: 1500, high: 11111111 },
            label: 'Over $1500',
            checked: false,
          }
      ],
    },

    ratings: {
      title: 'Ratings',
      ratings: [
        {
            rating: 5,
            checked: false,
          },
          {
            rating: 4,
            checked: false,
          },
          {
            rating: 3,
            checked: false,
          },
          {
            rating: 2,
            checked: false,
          },
          {
            rating: 1,
            checked: false,
          },
                          
      ],
    },

    sortFilters: {
      filters: [
        {
          id: 1,
          field: 'price',
          direction: 1,
          title: 'Price Low to High',
          checked: true,
        },
        {
          id: 2,
          field: 'price',
          direction: -1,
          title: 'Price High to Low',
          checked: false,
        },
        {
          id: 3,
          field: 'rating',
          direction: -1,
          title: 'Top Rated Products',
          checked: false,
        },
      ],
    },
  },
};

export const ProductSidebarReducer = createReducer(
  initialState,
  on(ProcessChange, (state, action) => {
    console.log('ProcessChange.productsSidebar', action.productSidebar);

    state = {
      ...state,
      productSidebar: action.productSidebar,
    };

    saveStateToLocalStorage(state);

    return {
      ...state,
    };
  }),

  on(restoreStateFromLocalStorage, (state, action) => {          
    if(action.hdepot?.productSidebar) {
        state.productSidebar = action.hdepot?.productSidebar
        console.log('action.hdepot?.productSidebar', action.hdepot?.productSidebar)
    } else {
        state = initialState;
        console.log('state.productSidebar', state.productSidebar)
    }
        
    return {
      ...state
    }
  }),

);


