import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { resetBag } from '..';

describe('resetBag() action creator', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('should dispatch the correct action when there are no fields to resetBag', () => {
    store.dispatch(resetBag());
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
