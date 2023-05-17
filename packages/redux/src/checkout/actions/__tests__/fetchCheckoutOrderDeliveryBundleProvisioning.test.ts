import * as actionTypes from '../../actionTypes.js';
import * as normalizr from 'normalizr';
import {
  checkoutId,
  expectedItemDeliveryProvisioningNormalizedPayload,
  mockDeliveryBundlesResponse,
  mockItemDeliveryPorvisioningResponse,
} from 'tests/__fixtures__/checkout/index.mjs';
import { fetchCheckoutOrderDeliveryBundleProvisioning } from '../index.js';
import { find } from 'lodash-es';
import { getCheckoutOrderDeliveryBundleProvisioning } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderDeliveryBundleProvisioning: jest.fn(),
}));

describe('fetchCheckoutOrderDeliveryBundleProvisioning() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0]?.id as string;
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch order delivery bundle provisioning procedure fails', async () => {
    const expectedError = new Error(
      'fetch checkout order delivery bundle provisioning error',
    );

    (
      getCheckoutOrderDeliveryBundleProvisioning as jest.Mock
    ).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchCheckoutOrderDeliveryBundleProvisioning(
          checkoutId,
          deliveryBundleId,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getCheckoutOrderDeliveryBundleProvisioning).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderDeliveryBundleProvisioning).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_REQUEST,
        },
        {
          type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch order delivery bundle provisioning procedure is successful', async () => {
    (
      getCheckoutOrderDeliveryBundleProvisioning as jest.Mock
    ).mockResolvedValueOnce(mockItemDeliveryPorvisioningResponse);

    await fetchCheckoutOrderDeliveryBundleProvisioning(
      checkoutId,
      deliveryBundleId,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockItemDeliveryPorvisioningResponse);
    });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderDeliveryBundleProvisioning).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderDeliveryBundleProvisioning).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_REQUEST,
      },
      {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS,
        meta: { deliveryBundleId },
        payload: expectedItemDeliveryProvisioningNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS,
      }),
    ).toMatchSnapshot('fetch checkout order delivery bundle provisioning');
  });
});
