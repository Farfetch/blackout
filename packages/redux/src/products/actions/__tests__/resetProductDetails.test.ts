import { INITIAL_STATE } from '../../reducer/details';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';
import { resetProductDetails } from '..';

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
