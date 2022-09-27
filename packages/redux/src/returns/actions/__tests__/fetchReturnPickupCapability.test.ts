import * as actionTypes from '../../actionTypes';
import { fetchReturnPickupCapability } from '..';
import { getReturnPickupCapability } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockPickupCapabilityResponse,
  pickupDay,
} from 'tests/__fixtures__/returns';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getReturnPickupCapability: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('fetchReturnPickupCapability action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof returnsMockStore>;
  const returnId = 5926969;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get pickup capability procedure fails', async () => {
    const expectedError = new Error('fetch pickup capability error');

    (getReturnPickupCapability as jest.Mock).mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    await fetchReturnPickupCapability(
      returnId,
      pickupDay,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(getReturnPickupCapability).toHaveBeenCalledTimes(1);
      expect(getReturnPickupCapability).toHaveBeenCalledWith(
        returnId,
        pickupDay,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_REQUEST,
            meta: { hash: '5926969|2020-04-20' },
          },
          {
            type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_FAILURE,
            payload: { error: expectedError },
            meta: { hash: '5926969|2020-04-20' },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the get pickup capability procedure is successful', async () => {
    (getReturnPickupCapability as jest.Mock).mockResolvedValueOnce(
      mockPickupCapabilityResponse,
    );

    await fetchReturnPickupCapability(
      returnId,
      pickupDay,
    )(store.dispatch).then(result => {
      expect(result).toBe(mockPickupCapabilityResponse);
    });

    const actionResults = store.getActions();

    expect(getReturnPickupCapability).toHaveBeenCalledTimes(1);
    expect(getReturnPickupCapability).toHaveBeenCalledWith(
      returnId,
      pickupDay,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_REQUEST },
      {
        type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_SUCCESS,
      }),
    ).toMatchSnapshot('fetch pickup capability success payload');
  });
});
