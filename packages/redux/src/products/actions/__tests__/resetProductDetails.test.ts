import { INITIAL_STATE } from '../../reducer/details.js';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';
import { resetProductDetails } from '../index.js';

describe('resetProductDetails() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ products: { details: INITIAL_STATE } }, {});
    resetProductDetails()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: productsActionTypes.RESET_PRODUCT_DETAILS_STATE,
      },
      {
        type: productsActionTypes.RESET_PRODUCT_DETAILS_ENTITIES,
      },
    ]);
  });
});
