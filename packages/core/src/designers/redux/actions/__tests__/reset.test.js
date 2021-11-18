import * as actions from '../';
import { actionTypes } from '../../';
import { mockStore } from '../../../../../tests';

describe('reset() action creator', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(actions.reset());

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_DESIGNERS,
      },
    ]);
  });
});
