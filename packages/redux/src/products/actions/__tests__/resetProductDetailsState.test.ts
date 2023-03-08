import { INITIAL_STATE } from '../../reducer/details.js';
import { mockStore } from '../../../../tests/index.js';
import { productsActionTypes } from '../../index.js';
import { resetProductDetailsState } from '../index.js';

describe('resetProductDetailsState() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  it('should dispatch the correct action type', () => {
    store = mockStore({ products: { details: INITIAL_STATE } }, {});
    resetProductDetailsState()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: productsActionTypes.RESET_PRODUCT_DETAILS_STATE,
      },
    ]);
  });
});
