import { mockStore } from '../../../../../tests';
import doResetInstruments from '../doResetInstruments';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

let store;

describe('reset action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should dispatch the correct action type', () => {
    store.dispatch(doResetInstruments());
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_INSTRUMENTS,
      },
    ]);
  });
});
