import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { resetAddressPredictions } from '..';

const addressesMockStore = (state = {}) =>
  mockStore({ addresses: INITIAL_STATE }, state);

let store;

describe('resetAddressPredictions() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = addressesMockStore();
  });

  it('should create the correct action to reset predictions state', () => {
    store.dispatch(resetAddressPredictions());

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_ADDRESS_PREDICTIONS,
      },
    ]);
  });
});
