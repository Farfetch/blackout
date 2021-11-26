import { actionTypes } from '../../';
import { mockStore } from '../../../../tests';
import { reset } from '..';

let store;

describe('reset action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('should dispatch the correct action type', () => {
    store.dispatch(reset());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_ADDRESSES,
      },
    ]);
  });
});
