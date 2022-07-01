import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import resetPaymentInstrumentsState from '../resetPaymentInstrumentsState';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

let store;

describe('reset payment instruments action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    store.dispatch(resetPaymentInstrumentsState());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PAYMENT_INSTRUMENTS_STATE,
      },
    ]);
  });
});
