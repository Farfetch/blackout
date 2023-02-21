import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import resetUserCreditBalanceState from '../resetUserCreditBalanceState';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset user credit balance state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetUserCreditBalanceState()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_USER_CREDIT_BALANCE_STATE,
      },
    ]);
  });
});
