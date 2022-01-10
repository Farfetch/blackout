import { actionTypes } from '../..';
import { fetchPickupCapabilities } from '..';
import { getPickupCapabilities } from '@farfetch/blackout-client/returns';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/returns', () => ({
  ...jest.requireActual('@farfetch/blackout-client/returns'),
  getPickupCapabilities: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('fetchPickupCapabilities action creator', () => {
  const pickupDay = '2020-04-20';
  const expectedConfig = undefined;
  let store;
  const returnId = 5926969;

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get pickup capabilities procedure fails', async () => {
    const expectedError = new Error('get pickup capabilities error');

    getPickupCapabilities.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPickupCapabilities(returnId, pickupDay));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPickupCapabilities).toHaveBeenCalledTimes(1);
      expect(getPickupCapabilities).toHaveBeenCalledWith(
        returnId,
        pickupDay,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST,
          },
          {
            type: actionTypes.FETCH_PICKUP_CAPABILITIES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get pickup capabilities procedure is successful', async () => {
    getPickupCapabilities.mockResolvedValueOnce();
    await store.dispatch(fetchPickupCapabilities(returnId, pickupDay));

    const actionResults = store.getActions();

    expect(getPickupCapabilities).toHaveBeenCalledTimes(1);
    expect(getPickupCapabilities).toHaveBeenCalledWith(
      returnId,
      pickupDay,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST },
      {
        type: actionTypes.FETCH_PICKUP_CAPABILITIES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PICKUP_CAPABILITIES_SUCCESS,
      }),
    ).toMatchSnapshot('get pickup capabilities success payload');
  });
});
