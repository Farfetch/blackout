import * as actions from '../index.js';
import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';

describe('reset() action creator', () => {
  it('should dispatch the correct action type', () => {
    const store = mockStore({});

    actions.resetEntities()(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.RESET_ENTITIES,
      },
    ]);
  });
});
