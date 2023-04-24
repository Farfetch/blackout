import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import resetPaymentInstruments from '../resetPaymentIntentInstruments.js';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset payment instruments state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetPaymentInstruments()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PAYMENT_INTENT_INSTRUMENTS_STATE,
      },
    ]);
  });
});
