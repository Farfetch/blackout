import { mockStore } from '../../../../tests';
import { resetPredictions } from '..';
import reducer, { actionTypes } from '../..';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: reducer() }, state);

let store;

describe('resetPredictions() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct action to reset predictions state', () => {
    store.dispatch(resetPredictions());

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_PREDICTION,
      },
    ]);
  });
});
