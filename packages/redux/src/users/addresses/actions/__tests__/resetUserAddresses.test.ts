import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../../tests/index.js';
import { resetUserAddresses } from '../index.js';
import INITIAL_STATE from '../../reducer.js';

let store: ReturnType<typeof mockStore>;

describe('reset action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ addresses: INITIAL_STATE }, {});
  });

  it('should dispatch the correct action type', () => {
    resetUserAddresses()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_USER_ADDRESSES,
      },
    ]);
  });
});
