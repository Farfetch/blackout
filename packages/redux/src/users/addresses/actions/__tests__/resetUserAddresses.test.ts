import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import { resetUserAddresses } from '..';

let store;

describe('reset action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('should dispatch the correct action type', () => {
    store.dispatch(resetUserAddresses());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_USER_ADDRESSES,
      },
    ]);
  });
});
