import * as actions from '..';
import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';

describe('reset() action creator', () => {
  it('should dispatch the correct action type', () => {
    const store = mockStore();

    store.dispatch(actions.resetEntities());

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_ENTITIES,
      },
    ]);
  });
});
