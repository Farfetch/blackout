import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import resetUpdateCheckoutOrderItemState from '../resetUpdateCheckoutOrderItemState.js';

describe('resetUpdateCheckoutOrderItemState() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset update checkout order item state is called', () => {
    resetUpdateCheckoutOrderItemState()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_UPDATE_CHECKOUT_ORDER_ITEM_STATE,
      },
    ]);
  });
});
