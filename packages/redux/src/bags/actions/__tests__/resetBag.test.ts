import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetBag } from '..';

describe('resetBag() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ bag: INITIAL_STATE }, {});
  });

  it('should dispatch the correct action when there are no fields to resetBag', () => {
    resetBag()(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: {},
        type: actionTypes.RESET_BAG_STATE,
      },
      {
        type: actionTypes.RESET_BAG_ENTITIES,
      },
    ]);
  });
});
