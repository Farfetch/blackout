import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import { resetUserAddresses } from '..';
import INITIAL_STATE from '../../reducer';

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
