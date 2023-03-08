import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { orderId, orderId2 } from 'tests/__fixtures__/orders/index.mjs';
import { resetOrderReturns } from '../index.js';

describe('resetOrderReturns() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({}, {});
  });

  it('should dispatch the correct action', () => {
    const ordersToReset = [orderId, orderId2];

    resetOrderReturns(ordersToReset)(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: ordersToReset,
        type: actionTypes.RESET_ORDER_RETURNS_STATE,
      },
      {
        payload: ordersToReset,
        type: actionTypes.RESET_ORDER_RETURNS_ENTITIES,
      },
    ]);
  });
});
