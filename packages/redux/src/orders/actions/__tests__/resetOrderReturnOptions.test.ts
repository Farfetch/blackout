import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { orderId, orderId2 } from 'tests/__fixtures__/orders/index.mjs';
import { resetOrderReturnOptionsState } from '../index.js';

describe('resetOrderReturnOptions() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({}, {});
  });

  it('should dispatch the correct action', () => {
    const ordersToReset = [orderId, orderId2];

    resetOrderReturnOptionsState(ordersToReset)(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: ordersToReset,
        type: actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE,
      },
    ]);
  });
});
