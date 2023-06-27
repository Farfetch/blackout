import { INITIAL_STATE } from '../../reducer/lists.js';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';
import { resetProductListings } from '../index.js';

describe('resetProductListings() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ products: { lists: INITIAL_STATE } }, {});
    resetProductListings()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: productsActionTypes.RESET_PRODUCT_LISTINGS_STATE,
      },
      {
        type: productsActionTypes.RESET_PRODUCT_LISTING_ENTITIES,
      },
      {
        type: productsActionTypes.RESET_PRODUCT_LISTING_FACETS,
      },
    ]);
  });
});
