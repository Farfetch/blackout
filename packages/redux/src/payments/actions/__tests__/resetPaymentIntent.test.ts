import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import resetPaymentIntent from '../resetPaymentIntent.js';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset payment intent state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetPaymentIntent()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PAYMENT_INTENT_STATE,
      },
    ]);
  });
});
