import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { resetDraftOrders } from '../index.js';

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
let store: ReturnType<typeof ordersMockStore>;

describe('resetDraftOrders() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should dispatch the correct action for when the reset draft orders is called', async () => {
    await resetDraftOrders()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_DRAFT_ORDERS_STATE },
    ]);
  });
});
