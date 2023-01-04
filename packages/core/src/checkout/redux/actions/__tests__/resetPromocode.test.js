import { mockStore } from '../../../../../tests';
import reducer, { actionTypes } from '../..';
import resetPromocode from '../resetPromocode';

describe('resetPromocode() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset promocode is called', () => {
    store.dispatch(resetPromocode());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.SET_PROMOCODE_RESET,
      },
    ]);
  });
});
