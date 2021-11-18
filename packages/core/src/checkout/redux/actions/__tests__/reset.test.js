import { mockStore } from '../../../../../tests';
import reducer, { actionTypes } from '../..';
import reset from '../reset';

describe('doResetCheckout() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset checkout is called', () => {
    store.dispatch(reset());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CHECKOUT,
      },
    ]);
  });
});
