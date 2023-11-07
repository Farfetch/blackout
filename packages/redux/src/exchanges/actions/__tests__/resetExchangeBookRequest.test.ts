import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetExchangeBookRequestState } from '../index.js';

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: INITIAL_STATE }, state);
let store: ReturnType<typeof exchangesMockStore>;

describe('resetExchangeBookRequestState() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should dispatch the correct action for when the reset exchange book request is called', async () => {
    await resetExchangeBookRequestState()(store.dispatch);

    expect(store.getActions()).toMatchObject([
      { type: actionTypes.RESET_EXCHANGE_BOOK_REQUEST_STATE },
    ]);
  });
});
