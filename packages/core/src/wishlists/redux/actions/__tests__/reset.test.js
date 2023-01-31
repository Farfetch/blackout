import { actionTypes } from '../../';
import { mockStore } from '../../../../../tests';
import { reset } from '../';

let store;

describe('reset()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action when there are no fields to reset', () => {
    store.dispatch(reset());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        payload: {},
        type: actionTypes.RESET_WISHLIST_STATE,
      },
      {
        type: actionTypes.RESET_WISHLIST_ENTITIES,
      },
    ]);
  });
});
