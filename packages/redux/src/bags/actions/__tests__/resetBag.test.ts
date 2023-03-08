import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetBag, resetBagOperationsEntities } from '../index.js';

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

  it('should dispatch the correct action to reset bag operations entities', () => {
    resetBagOperationsEntities()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_BAG_OPERATIONS_ENTITIES,
      },
    ]);
  });
});
