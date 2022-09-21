import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetOrders } from '..';

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
let store: ReturnType<typeof ordersMockStore>;

describe('resetOrders() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should dispatch the correct action for when the reset orders is called', async () => {
    await resetOrders()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_ORDERS },
    ]);
  });
});
