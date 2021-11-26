import * as actions from '..';
import { actionTypes } from '../..';
import { mockStore } from '../../../../tests';

describe('resetDesignersState() action creator', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(actions.resetDesignersState());

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_DESIGNERS_STATE,
      },
    ]);
  });
});
