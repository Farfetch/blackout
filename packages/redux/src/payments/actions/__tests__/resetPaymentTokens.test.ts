import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import resetPaymentTokens from '../resetPaymentTokens.js';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset payment tokens state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetPaymentTokens()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PAYMENT_TOKENS_STATE,
      },
    ]);
  });
});
