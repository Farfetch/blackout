import { INITIAL_STATE } from '../../reducer/lists.js';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';
import { resetProductsListsState } from '../index.js';

describe('resetProductsListsState() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ products: { lists: INITIAL_STATE } }, {});
    resetProductsListsState()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: productsActionTypes.RESET_PRODUCTS_LISTS_STATE,
      },
    ]);
  });
});
