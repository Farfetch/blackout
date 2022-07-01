import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import resetCheckoutOrderChargesState from '../resetCheckoutOrderChargeState';

describe('resetCheckoutOrderChargesState() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset charges state is called', () => {
    store.dispatch(resetCheckoutOrderChargesState());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CHECKOUT_ORDER_CHARGE_STATE,
      },
    ]);
  });
});
