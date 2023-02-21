import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import resetPaymentMethodsState from '../resetPaymentMethodsState';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset payment methods state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetPaymentMethodsState()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PAYMENT_METHODS_STATE,
      },
    ]);
  });
});
