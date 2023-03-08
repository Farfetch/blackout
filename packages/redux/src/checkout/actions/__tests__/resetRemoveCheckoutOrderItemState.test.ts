import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import resetRemoveCheckoutOrderItemState from '../resetRemoveCheckoutOrderItemState.js';

describe('resetRemoveCheckoutOrderItemState() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset remove checkout order item state is called', () => {
    resetRemoveCheckoutOrderItemState()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_REMOVE_CHECKOUT_ORDER_ITEM_STATE,
      },
    ]);
  });
});
