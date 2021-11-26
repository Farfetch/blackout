import { actionTypes } from '../..';
import { mockStore } from '../../../../tests';
import { resetProductDetailsState } from '..';

describe('resetProductDetailsState() action creator', () => {
  let store;

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(resetProductDetailsState());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_PRODUCT_DETAILS_STATE,
      },
    ]);
  });
});
