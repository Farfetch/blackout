import { INITIAL_STATE } from '../../reducer/lists.js';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';
import { resetProductsLists } from '../index.js';

describe('resetProductsLists() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ products: { lists: INITIAL_STATE } }, {});
    resetProductsLists()(store.dispatch);

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
