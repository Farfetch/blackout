import { actionTypes } from '../..';
import { mockStore } from '../../../../tests';
import { resetProductDetails } from '..';

describe('resetProductDetails() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetProductDetails());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_PRODUCT_DETAILS_STATE,
      },
      {
        type: actionTypes.RESET_PRODUCT_DETAILS_ENTITIES,
      },
    ]);
  });
});
