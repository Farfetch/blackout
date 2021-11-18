import { mockStore } from '../../../../../tests';
import doResetPredictions from '../doResetPredictions';
import reducer, { actionTypes } from '../../';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

let store;

describe('doResetPredictions() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct action to reset predictions state', () => {
    store.dispatch(doResetPredictions());

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PREDICTION,
      },
    ]);
  });
});
