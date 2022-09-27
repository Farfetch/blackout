import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { orderId, orderId2 } from 'tests/__fixtures__/orders';
import { resetOrderReturns } from '..';

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
