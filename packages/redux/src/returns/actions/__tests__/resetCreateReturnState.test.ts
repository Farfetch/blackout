import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetCreateReturnState } from '../../actions';

describe('resetCreateReturnState() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({}, {});
  });

  it('should dispatch the correct action', () => {
    resetCreateReturnState()(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        type: actionTypes.RESET_CREATE_RETURN_STATE,
      },
    ]);
  });
});
