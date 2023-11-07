import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetExchangeFilters } from '../index.js';

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: INITIAL_STATE }, state);
let store: ReturnType<typeof exchangesMockStore>;

describe('resetExchangeFilters() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should dispatch the correct action for when the reset exchange filters is called', () => {
    resetExchangeFilters()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        type: actionTypes.RESET_EXCHANGE_FILTERS_STATE,
      },
      {
        type: actionTypes.RESET_EXCHANGE_FILTERS_ENTITIES,
      },
    ]);
  });
});
