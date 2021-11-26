import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import resetChargesState from '../resetChargesState';

describe('resetChargesState() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset charges state is called', () => {
    store.dispatch(resetChargesState());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CHARGES_STATE,
      },
    ]);
  });
});
