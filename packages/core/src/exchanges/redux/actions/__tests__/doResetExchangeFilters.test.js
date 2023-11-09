import { actionTypes } from '../../';
import { mockStore } from '../../../../../tests';
import doResetExchangeFilters from '../doResetExchangeFilters';

let store;

describe('reset action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('should dispatch the correct action type', () => {
    store.dispatch(doResetExchangeFilters());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_EXCHANGE_FILTERS_STATE,
      },
      {
        type: actionTypes.RESET_EXCHANGE_FILTERS_ENTITIES,
      },
    ]);
  });
});
