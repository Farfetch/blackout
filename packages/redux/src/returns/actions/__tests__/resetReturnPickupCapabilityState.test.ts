import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { pickupDay, returnId } from 'tests/__fixtures__/returns/index.mjs';
import { resetReturnPickupCapabilityState } from '../index.js';

describe('resetReturnPickupCapabilityState() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({}, {});
  });

  it('should dispatch the correct action', () => {
    const returnPickupCapabilitiesToReset = [{ returnId, pickupDay }];

    resetReturnPickupCapabilityState(returnPickupCapabilitiesToReset)(
      store.dispatch,
    );

    const actionResults = store.getActions();

    expect(actionResults).toEqual([
      {
        payload: returnPickupCapabilitiesToReset,
        type: actionTypes.RESET_RETURN_PICKUP_CAPABILITY_STATE,
      },
    ]);
  });
});
