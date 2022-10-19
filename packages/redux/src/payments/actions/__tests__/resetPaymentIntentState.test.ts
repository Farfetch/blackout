import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import resetPaymentIntentState from '../resetPaymentIntentState';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset payment intent state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetPaymentIntentState()(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PAYMENT_INTENT_STATE,
      },
    ]);
  });
});
