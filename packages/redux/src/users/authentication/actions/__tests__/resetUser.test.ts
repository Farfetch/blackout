import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../../tests';
import { resetUser } from '..';

describe('resetUser() action creator', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('should dispatch the correct action when there are no fields to resetUser', () => {
    store.dispatch(resetUser());
    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_USER_STATE,
      },
      {
        type: actionTypes.RESET_USER_ENTITIES,
      },
    ]);
  });
});
