import { actionTypes } from '../..';
import { mockStore } from '../../../../../tests';
import { reset, resetBagOperationsEntities } from '../';

describe('reset() action creator', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('should dispatch the correct action when there are no fields to reset', () => {
    store.dispatch(reset());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
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
    store.dispatch(resetBagOperationsEntities());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_BAG_OPERATIONS,
      },
    ]);
  });
});
