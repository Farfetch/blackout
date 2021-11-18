import {
  checkoutId,
  mockDeliveryBundlesResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doUpdateDeliveryBundleUpgrade from '../doUpdateDeliveryBundleUpgrade';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doUpdateDeliveryBundleUpgrade() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0].id;
  const upgradeId = 123435;
  const patchDeliveryBundleUpgrade = jest.fn();
  const data = [{ value: 'true' }];
  const action = doUpdateDeliveryBundleUpgrade(patchDeliveryBundleUpgrade);
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update delivery bundle upgrade procedure fails', async () => {
    const expectedError = new Error('update delivery bundle upgrade error');

    patchDeliveryBundleUpgrade.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        action(checkoutId, deliveryBundleId, upgradeId, data),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchDeliveryBundleUpgrade).toHaveBeenCalledTimes(1);
      expect(patchDeliveryBundleUpgrade).toHaveBeenCalledWith(
        checkoutId,
        deliveryBundleId,
        upgradeId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST,
          },
          {
            type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update delivery bundle upgrade procedure is successful', async () => {
    patchDeliveryBundleUpgrade.mockResolvedValueOnce();
    await store.dispatch(action(checkoutId, deliveryBundleId, upgradeId, data));
    const actionResults = store.getActions();

    expect.assertions(4);
    expect(patchDeliveryBundleUpgrade).toHaveBeenCalledTimes(1);
    expect(patchDeliveryBundleUpgrade).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      upgradeId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST,
      },
      {
        type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS,
      }),
    ).toMatchSnapshot('update delivery bundle upgrade success payload');
  });
});
