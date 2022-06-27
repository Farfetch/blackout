import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';
import { resetProductsLists } from '..';

describe('resetProductsLists() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetProductsLists());

    expect(store.getActions()).toEqual([
      {
        type: productsActionTypes.RESET_PRODUCTS_LISTS_STATE,
      },
      {
        type: productsActionTypes.RESET_PRODUCTS_LISTS_ENTITIES,
      },
    ]);
  });
});
