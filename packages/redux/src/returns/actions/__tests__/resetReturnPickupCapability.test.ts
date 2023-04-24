import * as actionTypes from '../../actionTypes.js';
import { mockStore } from '../../../../tests/index.js';
import { pickupDay, returnId } from 'tests/__fixtures__/returns/index.mjs';
import { resetReturnPickupCapability } from '../index.js';

describe('resetReturnPickupCapability() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({}, {});
  });

  it('should dispatch the correct action', () => {
    const returnPickupCapabilitiesToReset = [{ returnId, pickupDay }];

    resetReturnPickupCapability(returnPickupCapabilitiesToReset)(
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
