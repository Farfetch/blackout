import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetOrderReturnOptionsState } from '../index.js';

const ordersMockStore = (state = {}) =>
  mockStore({ orders: INITIAL_STATE }, state);
let store: ReturnType<typeof ordersMockStore>;

describe('resetOrderReturnOptionsState() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should dispatch the correct action for when the reset order return options state is called', async () => {
    const orderIds = ['1', '2', '3'];

    await resetOrderReturnOptionsState(orderIds)(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE, payload: orderIds },
    ]);
  });
});
