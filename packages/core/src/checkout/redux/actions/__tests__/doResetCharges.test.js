import { mockStore } from '../../../../../tests';
import doResetCharges from '../doResetCharges';
import reducer, { actionTypes } from '../..';

describe('doResetCharges() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset charges is called', () => {
    store.dispatch(doResetCharges());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CHARGES,
      },
    ]);
  });
});
