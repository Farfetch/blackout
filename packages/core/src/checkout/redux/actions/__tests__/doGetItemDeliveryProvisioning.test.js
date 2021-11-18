import {
  checkoutId,
  expectedItemDeliveryProvisioningNormalizedPayload,
  mockDeliveryBundlesResponse,
  mockItemDeliveryPorvisioningResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doGetItemDeliveryProvisioning from '../doGetItemDeliveryProvisioning';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doGetItemDeliveryProvisioning() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0].id;
  const getItemDeliveryProvisioning = jest.fn();
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const action = doGetItemDeliveryProvisioning(getItemDeliveryProvisioning);
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the get item delivery provisioning procedure fails', async () => {
    const expectedError = new Error('get item delivery provisioning error');

    getItemDeliveryProvisioning.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, deliveryBundleId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getItemDeliveryProvisioning).toHaveBeenCalledTimes(1);
      expect(getItemDeliveryProvisioning).toHaveBeenCalledWith(
        checkoutId,
        deliveryBundleId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_ITEM_DELIVERY_PROVISIONING_REQUEST,
          },
          {
            type: actionTypes.GET_ITEM_DELIVERY_PROVISIONING_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get item delivery provisioning procedure is successful', async () => {
    getItemDeliveryProvisioning.mockResolvedValueOnce(
      mockItemDeliveryPorvisioningResponse,
    );
    await store.dispatch(action(checkoutId, deliveryBundleId));
    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getItemDeliveryProvisioning).toHaveBeenCalledTimes(1);
    expect(getItemDeliveryProvisioning).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_ITEM_DELIVERY_PROVISIONING_REQUEST },
      {
        type: actionTypes.GET_ITEM_DELIVERY_PROVISIONING_SUCCESS,
        meta: { deliveryBundleId },
        payload: expectedItemDeliveryProvisioningNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      }),
    ).toMatchSnapshot('get item delivery provisioning');
  });
});
