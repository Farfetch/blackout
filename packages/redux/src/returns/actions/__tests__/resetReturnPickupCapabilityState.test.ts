import * as actionTypes from '../../actionTypes';
import { mockStore } from '../../../../tests';
import { pickupDay, returnId } from 'tests/__fixtures__/returns';
import { resetReturnPickupCapabilityState } from '..';

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
