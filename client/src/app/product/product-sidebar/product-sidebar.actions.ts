import { createAction, props } from '@ngrx/store';

export const ProcessChange = createAction(
  '[Process Change] Process Change',
  props<{ productSidebar }>()
);

export const StoreProducts = createAction(
  '[Store Products] Store Products',
  props<{ productData }>()
);

