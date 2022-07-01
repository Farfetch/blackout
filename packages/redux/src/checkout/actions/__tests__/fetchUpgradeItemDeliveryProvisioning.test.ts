import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  checkoutId,
  expectedItemDeliveryProvisioningNormalizedPayload,
  mockDeliveryBundlesResponse,
  mockItemDeliveryPorvisioningResponse,
} from 'tests/__fixtures__/checkout';
import { fetchUpgradeItemDeliveryProvisioning } from '..';
import { getCheckoutOrderDeliveryBundleUpgradeProvisioning } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderDeliveryBundleUpgradeProvisioning: jest.fn(),
}));

describe('fetchUpgradeItemDeliveryProvisioning() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0].id;
  const upgradeId = '1234';
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch upgrade item delivery provisioning procedure fails', async () => {
    const expectedError = new Error(
      'fetch upgrade item delivery provisioning error',
    );

    getCheckoutOrderDeliveryBundleUpgradeProvisioning.mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    try {
      await store.dispatch(
        fetchUpgradeItemDeliveryProvisioning(
          checkoutId,
          deliveryBundleId,
          upgradeId,
        ),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(
        getCheckoutOrderDeliveryBundleUpgradeProvisioning,
      ).toHaveBeenCalledTimes(1);
      expect(
        getCheckoutOrderDeliveryBundleUpgradeProvisioning,
      ).toHaveBeenCalledWith(
        checkoutId,
        deliveryBundleId,
        upgradeId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
          },
          {
            type: actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch upgrade item delivery provisioning procedure is successful', async () => {
    getCheckoutOrderDeliveryBundleUpgradeProvisioning.mockResolvedValueOnce(
      mockItemDeliveryPorvisioningResponse,
    );
    await store.dispatch(
      fetchUpgradeItemDeliveryProvisioning(
        checkoutId,
        deliveryBundleId,
        upgradeId,
      ),
    );
    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(
      getCheckoutOrderDeliveryBundleUpgradeProvisioning,
    ).toHaveBeenCalledTimes(1);
    expect(
      getCheckoutOrderDeliveryBundleUpgradeProvisioning,
    ).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      upgradeId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
      },
      {
        type: actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
        meta: { deliveryBundleId, upgradeId },
        payload: expectedItemDeliveryProvisioningNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      }),
    ).toMatchSnapshot('fetch upgrade item delivery provisioning');
  });
});
