import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetOrderDetails } from '../index.js';

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
let store: ReturnType<typeof ordersMockStore>;

describe('resetOrderDetails() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should dispatch the correct action for when the reset order details state is called', async () => {
    const orderIds = ['1', '2', '3'];

    await resetOrderDetails(orderIds)(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_ORDER_DETAILS_STATE, payload: orderIds },
    ]);
  });
});
