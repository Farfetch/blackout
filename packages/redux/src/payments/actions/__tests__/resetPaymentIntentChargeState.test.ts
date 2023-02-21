import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import resetPaymentIntentChargeState from '../resetPaymentIntentChargeState';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset payment intent charge state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetPaymentIntentChargeState()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PAYMENT_INTENT_CHARGE_STATE,
      },
    ]);
  });
});
