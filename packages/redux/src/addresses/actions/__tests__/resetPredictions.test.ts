import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetPredictions } from '..';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

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
