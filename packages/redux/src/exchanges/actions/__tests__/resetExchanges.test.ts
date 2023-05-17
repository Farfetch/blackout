import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetExchanges } from '../index.js';

const exchangesMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);
let store: ReturnType<typeof exchangesMockStore>;

describe('resetExchanges() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should dispatch the correct action for when the reset exchanges is called', async () => {
    await resetExchanges()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_EXCHANGES },
    ]);
  });
});
