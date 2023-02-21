import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetBag, resetBagOperationsEntities } from '..';

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
