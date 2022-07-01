import * as actionTypes from '../../actionTypes';
import {
  checkoutId,
  expectedUpgradesNormalizedPayload,
  mockDeliveryBundlesResponse,
  mockDeliveryBundleUpgradesResponse,
} from 'tests/__fixtures__/checkout';
import { fetchDeliveryBundleUpgrades } from '..';
import { getCheckoutOrderDeliveryBundleUpgrades } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderDeliveryBundleUpgrades: jest.fn(),
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

    getCheckoutOrderDeliveryBundleUpgrades.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        fetchDeliveryBundleUpgrades(checkoutId, deliveryBundleId),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCheckoutOrderDeliveryBundleUpgrades).toHaveBeenCalledTimes(1);
      expect(getCheckoutOrderDeliveryBundleUpgrades).toHaveBeenCalledWith(
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
    getCheckoutOrderDeliveryBundleUpgrades.mockResolvedValueOnce(
      mockDeliveryBundleUpgradesResponse,
    );
    await store.dispatch(
      fetchDeliveryBundleUpgrades(checkoutId, deliveryBundleId),
    );
    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getCheckoutOrderDeliveryBundleUpgrades).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderDeliveryBundleUpgrades).toHaveBeenCalledWith(
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
