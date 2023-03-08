import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import {
  checkoutId,
  expectedItemDeliveryProvisioningNormalizedPayload,
  mockDeliveryBundlesResponse,
  mockItemDeliveryPorvisioningResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { fetchCheckoutOrderDeliveryBundleUpgradeProvisioning } from '../index.js';
import { find } from 'lodash-es';
import { getCheckoutOrderDeliveryBundleUpgradeProvisioning } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderDeliveryBundleUpgradeProvisioning: jest.fn(),
}));

describe('fetchCheckoutOrderDeliveryBundleUpgradeProvisioning() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0]?.id as string;
  const upgradeId = '1234';
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch checkout order delivery bundle upgrade provisioning procedure fails', async () => {
    const expectedError = new Error(
      'fetch checkout order delivery bundle upgrade provisioning error',
    );

    (
      getCheckoutOrderDeliveryBundleUpgradeProvisioning as jest.Mock
    ).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchCheckoutOrderDeliveryBundleUpgradeProvisioning(
          checkoutId,
          deliveryBundleId,
          upgradeId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

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
          type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_REQUEST,
        },
        {
          type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch checkout order delivery bundle upgrade provisioning procedure is successful', async () => {
    (
      getCheckoutOrderDeliveryBundleUpgradeProvisioning as jest.Mock
    ).mockResolvedValueOnce(mockItemDeliveryPorvisioningResponse);

    await fetchCheckoutOrderDeliveryBundleUpgradeProvisioning(
      checkoutId,
      deliveryBundleId,
      upgradeId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockItemDeliveryPorvisioningResponse);
    });

    const actionResults = store.getActions();

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
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_REQUEST,
      },
      {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS,
        meta: { deliveryBundleId, upgradeId },
        payload: expectedItemDeliveryProvisioningNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS,
      }),
    ).toMatchSnapshot(
      'fetch checkout order delivery bundle upgrade provisioning',
    );
  });
});
