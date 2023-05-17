import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetExchangeFilterState } from '../index.js';

const exchangesMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);
let store: ReturnType<typeof exchangesMockStore>;

describe('resetExchangeFilterState() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should dispatch the correct action for when the reset exchange filter is called', async () => {
    await resetExchangeFilterState()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_EXCHANGE_FILTER_STATE },
    ]);
  });
});
