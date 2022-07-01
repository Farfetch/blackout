import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import {
  checkoutId,
  expectedItemDeliveryProvisioningNormalizedPayload,
  mockDeliveryBundlesResponse,
  mockItemDeliveryPorvisioningResponse,
} from 'tests/__fixtures__/checkout';
import { fetchItemDeliveryProvisioning } from '..';
import { getCheckoutOrderDeliveryBundleProvisioning } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getCheckoutOrderDeliveryBundleProvisioning: jest.fn(),
}));

describe('fetchItemDeliveryProvisioning() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0].id;
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the fetch item delivery provisioning procedure fails', async () => {
    const expectedError = new Error('fetch item delivery provisioning error');

    getCheckoutOrderDeliveryBundleProvisioning.mockRejectedValueOnce(
      expectedError,
    );
    expect.assertions(4);

    try {
      await store.dispatch(
        fetchItemDeliveryProvisioning(checkoutId, deliveryBundleId),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCheckoutOrderDeliveryBundleProvisioning).toHaveBeenCalledTimes(
        1,
      );
      expect(getCheckoutOrderDeliveryBundleProvisioning).toHaveBeenCalledWith(
        checkoutId,
        deliveryBundleId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_REQUEST,
          },
          {
            type: actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch item delivery provisioning procedure is successful', async () => {
    getCheckoutOrderDeliveryBundleProvisioning.mockResolvedValueOnce(
      mockItemDeliveryPorvisioningResponse,
    );
    await store.dispatch(
      fetchItemDeliveryProvisioning(checkoutId, deliveryBundleId),
    );
    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderDeliveryBundleProvisioning).toHaveBeenCalledTimes(1);
    expect(getCheckoutOrderDeliveryBundleProvisioning).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_REQUEST },
      {
        type: actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS,
        meta: { deliveryBundleId },
        payload: expectedItemDeliveryProvisioningNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      }),
    ).toMatchSnapshot('fetch item delivery provisioning');
  });
});
