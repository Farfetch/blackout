import * as actionTypes from '../../actionTypes';
import { fetchReturnPickupCapabilities } from '..';
import { getReturnPickupCapabilities } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockPickupCapabilitiesResponse,
  pickupDay,
} from 'tests/__fixtures__/returns';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getReturnPickupCapabilities: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('fetchReturnPickupCapabilities action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof returnsMockStore>;
  const returnId = 5926969;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get pickup capabilities procedure fails', async () => {
    const expectedError = new Error('fetch pickup capabilities error');

    (getReturnPickupCapabilities as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    await fetchReturnPickupCapabilities(
      returnId,
      pickupDay,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getReturnPickupCapabilities).toHaveBeenCalledTimes(1);
      expect(getReturnPickupCapabilities).toHaveBeenCalledWith(
        returnId,
        pickupDay,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST,
          },
          {
            type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the get pickup capabilities procedure is successful', async () => {
    (getReturnPickupCapabilities as jest.Mock).mockResolvedValueOnce(
      mockPickupCapabilitiesResponse,
    );

    await fetchReturnPickupCapabilities(
      returnId,
      pickupDay,
    )(store.dispatch).then(result => {
      expect(result).toBe(mockPickupCapabilitiesResponse);
    });

    const actionResults = store.getActions();

    expect(getReturnPickupCapabilities).toHaveBeenCalledTimes(1);
    expect(getReturnPickupCapabilities).toHaveBeenCalledWith(
      returnId,
      pickupDay,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST },
      {
        type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_SUCCESS,
      }),
    ).toMatchSnapshot('fetch pickup capabilities success payload');
  });
});
