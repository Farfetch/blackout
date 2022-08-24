import { INITIAL_STATE } from '../../reducer/details';
import { mockStore } from '../../../../tests';
import { productsActionTypes } from '../..';
import { resetProductDetailsState } from '..';

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
