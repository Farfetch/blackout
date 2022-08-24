import { INITIAL_STATE } from '../../reducer/lists';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';
import { resetProductsListsState } from '..';

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
