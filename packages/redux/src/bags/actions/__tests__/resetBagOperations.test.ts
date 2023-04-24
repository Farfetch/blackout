import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetBagOperations } from '../index.js';

describe('resetBagOperations() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({ bag: INITIAL_STATE }, {});
  });

  it('should dispatch the correct actions', () => {
    resetBagOperations()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        type: actionTypes.RESET_BAG_OPERATIONS_STATE,
      },
      {
        type: actionTypes.RESET_BAG_OPERATIONS_ENTITIES,
      },
    ]);
  });
});
