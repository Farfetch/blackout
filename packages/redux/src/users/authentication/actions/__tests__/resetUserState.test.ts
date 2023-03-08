import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../../tests/index.js';
import { resetUserState } from '../index.js';

describe('resetUserState() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ user: INITIAL_STATE }, {});
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['id'];

    resetUserState(fieldsToReset)(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_USER_STATE,
      },
    ]);
  });
});
