import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import { resetUserState } from '..';

describe('resetUserState() action creator', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['id'];

    store.dispatch(resetUserState(fieldsToReset));
    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_USER_STATE,
      },
    ]);
  });
});
