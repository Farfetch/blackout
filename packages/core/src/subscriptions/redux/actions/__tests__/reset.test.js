import { actionTypes } from '../../';
import { mockStore } from '../../../../../tests';
import { reset } from '../';

let store;

describe('reset()', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch the correct action', () => {
    store.dispatch(reset());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_SUBSCRIPTIONS,
      },
    ]);
  });
});
