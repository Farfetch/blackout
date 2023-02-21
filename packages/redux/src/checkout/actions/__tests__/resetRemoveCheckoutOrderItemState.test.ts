import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import resetRemoveCheckoutOrderItemState from '../resetRemoveCheckoutOrderItemState';

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
