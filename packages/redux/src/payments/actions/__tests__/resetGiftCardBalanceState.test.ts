import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import resetGiftCardBalanceState from '../resetGiftCardBalanceState';

const paymentsMockStore = (state = {}) => mockStore(null, state);

let store: ReturnType<typeof paymentsMockStore>;

describe('reset gift card balance state action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    resetGiftCardBalanceState()(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_GIFT_CARD_BALANCE_STATE,
      },
    ]);
  });
});
