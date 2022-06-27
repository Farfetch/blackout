import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';
import { resetProductDetails } from '..';

describe('resetProductDetails() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetProductDetails());

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
