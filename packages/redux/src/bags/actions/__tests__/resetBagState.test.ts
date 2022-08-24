import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetBagState } from '..';

describe('resetBagState() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ bag: INITIAL_STATE }, {});
  });

  it('should dispatch the correct action with fields to reset', () => {
    const fieldsToReset = ['id'];
    resetBagState(fieldsToReset)(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: { fieldsToReset },
        type: actionTypes.RESET_BAG_STATE,
      },
    ]);
  });
});
