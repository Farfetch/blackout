import { actionTypes } from '../..';
import {
  checkoutId,
  expectedUpgradesNormalizedPayload,
  mockDeliveryBundlesResponse,
  mockDeliveryBundleUpgradesResponse,
} from 'tests/__fixtures__/checkout';
import { fetchDeliveryBundleUpgrades } from '..';
import { getDeliveryBundleUpgrades } from '@farfetch/blackout-client/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  getDeliveryBundleUpgrades: jest.fn(),
}));

describe('fetchDeliveryBundleUpgrades() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0].id;
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch delivery bundle upgrades procedure fails', async () => {
    const expectedError = new Error('fetch delivery bundle upgrades error');

    getDeliveryBundleUpgrades.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        fetchDeliveryBundleUpgrades(checkoutId, deliveryBundleId),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getDeliveryBundleUpgrades).toHaveBeenCalledTimes(1);
      expect(getDeliveryBundleUpgrades).toHaveBeenCalledWith(
        checkoutId,
        deliveryBundleId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_REQUEST,
          },
          {
            type: actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch delivery bundle upgrades procedure is successful', async () => {
    getDeliveryBundleUpgrades.mockResolvedValueOnce(
      mockDeliveryBundleUpgradesResponse,
    );
    await store.dispatch(
      fetchDeliveryBundleUpgrades(checkoutId, deliveryBundleId),
    );
    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getDeliveryBundleUpgrades).toHaveBeenCalledTimes(1);
    expect(getDeliveryBundleUpgrades).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_REQUEST },
      {
        type: actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
        payload: {
          ...expectedUpgradesNormalizedPayload,
          result: deliveryBundleId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      }),
    ).toMatchSnapshot('fetch delivery bundle upgrades success payload');
  });
});
