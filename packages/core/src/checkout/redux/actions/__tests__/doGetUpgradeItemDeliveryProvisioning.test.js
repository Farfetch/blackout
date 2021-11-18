import {
  checkoutId,
  expectedItemDeliveryProvisioningNormalizedPayload,
  mockDeliveryBundlesResponse,
  mockItemDeliveryPorvisioningResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doGetUpgradeItemDeliveryProvisioning from '../doGetUpgradeItemDeliveryProvisioning';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doGetUpgradeItemDeliveryProvisioning() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0].id;
  const upgradeId = 1234;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const getUpgradeItemDeliveryProvisioning = jest.fn();
  const action = doGetUpgradeItemDeliveryProvisioning(
    getUpgradeItemDeliveryProvisioning,
  );
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the get upgrade item delivery provisioning procedure fails', async () => {
    const expectedError = new Error(
      'get upgrade item delivery provisioning error',
    );

    getUpgradeItemDeliveryProvisioning.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, deliveryBundleId, upgradeId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUpgradeItemDeliveryProvisioning).toHaveBeenCalledTimes(1);
      expect(getUpgradeItemDeliveryProvisioning).toHaveBeenCalledWith(
        checkoutId,
        deliveryBundleId,
        upgradeId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
          },
          {
            type: actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get upgrade item delivery provisioning procedure is successful', async () => {
    getUpgradeItemDeliveryProvisioning.mockResolvedValueOnce(
      mockItemDeliveryPorvisioningResponse,
    );
    await store.dispatch(action(checkoutId, deliveryBundleId, upgradeId));
    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getUpgradeItemDeliveryProvisioning).toHaveBeenCalledTimes(1);
    expect(getUpgradeItemDeliveryProvisioning).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      upgradeId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_REQUEST,
      },
      {
        type: actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
        meta: { deliveryBundleId, upgradeId },
        payload: expectedItemDeliveryProvisioningNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
      }),
    ).toMatchSnapshot('get upgrade item delivery provisioning');
  });
});
