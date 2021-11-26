import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import resetChargesState from '../resetChargesState';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: INITIAL_STATE }, state);

let store;

describe('reset charges action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    store.dispatch(resetChargesState());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CHARGES_STATE,
      },
    ]);
  });
});
