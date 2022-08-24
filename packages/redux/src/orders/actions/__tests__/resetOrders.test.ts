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

  it('should create the correct actions for when the get order return options procedure is successful', async () => {
    await resetOrders()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_ORDERS },
    ]);
  });
});
