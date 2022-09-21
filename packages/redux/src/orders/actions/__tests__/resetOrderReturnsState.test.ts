import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetOrderReturnsState } from '..';

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
let store: ReturnType<typeof ordersMockStore>;

describe('resetOrderReturnsState() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should dispatch the correct action for when the reset order returns state is called', async () => {
    const orderIds = ['1', '2', '3'];

    await resetOrderReturnsState(orderIds)(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_ORDER_RETURNS_STATE, payload: orderIds },
    ]);
  });
});
