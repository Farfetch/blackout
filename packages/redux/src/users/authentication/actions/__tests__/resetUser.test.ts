import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../../tests';
import { resetUser } from '..';

describe('resetUser() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ user: INITIAL_STATE }, {});
  });

  it('should dispatch the correct action when there are no fields to resetUser', () => {
    resetUser()(store.dispatch);

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
