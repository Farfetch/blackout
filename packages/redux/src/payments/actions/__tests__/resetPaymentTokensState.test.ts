import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import resetPaymentTokensState from '../resetPaymentTokensState';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset payment tokens state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetPaymentTokensState()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PAYMENT_TOKENS_STATE,
      },
    ]);
  });
});
