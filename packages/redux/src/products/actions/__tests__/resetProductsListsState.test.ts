import { actionTypesProducts } from '../..';
import { mockStore } from '../../../../tests';
import { resetProductsListsState } from '..';

describe('resetProductsListsState() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetProductsListsState());

    expect(store.getActions()).toEqual([
      {
        type: actionTypesProducts.RESET_PRODUCTS_LISTS_STATE,
      },
    ]);
  });
});
