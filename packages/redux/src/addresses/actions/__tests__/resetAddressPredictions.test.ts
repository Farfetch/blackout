import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { resetAddressPredictions } from '../index.js';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

let store: ReturnType<typeof addressesMockStore>;

describe('resetAddressPredictions() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct action to reset predictions state', () => {
    resetAddressPredictions()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_ADDRESS_PREDICTIONS,
      },
    ]);
  });
});
