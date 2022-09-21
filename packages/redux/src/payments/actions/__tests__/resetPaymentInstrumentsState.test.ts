import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import resetPaymentInstrumentsState from '../resetPaymentInstrumentsState';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset payment instruments state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetPaymentInstrumentsState()(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PAYMENT_INSTRUMENTS_STATE,
      },
    ]);
  });
});
