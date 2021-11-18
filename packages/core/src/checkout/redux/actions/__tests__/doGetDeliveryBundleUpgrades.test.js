import {
  checkoutId,
  expectedUpgradesNormalizedPayload,
  mockDeliveryBundlesResponse,
  mockDeliveryBundleUpgradesResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doGetDeliveryBundleUpgrades from '../doGetDeliveryBundleUpgrades';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doGetDeliveryBundleUpgrades() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0].id;
  const getDeliveryBundleUpgrades = jest.fn();
  const action = doGetDeliveryBundleUpgrades(getDeliveryBundleUpgrades);
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the get delivery bundle upgrades procedure fails', async () => {
    const expectedError = new Error('get delivery bundle upgrades error');

    getDeliveryBundleUpgrades.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, deliveryBundleId));
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
            type: actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_REQUEST,
          },
          {
            type: actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get delivery bundle upgrades procedure is successful', async () => {
    getDeliveryBundleUpgrades.mockResolvedValueOnce(
      mockDeliveryBundleUpgradesResponse,
    );
    await store.dispatch(action(checkoutId, deliveryBundleId));
    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getDeliveryBundleUpgrades).toHaveBeenCalledTimes(1);
    expect(getDeliveryBundleUpgrades).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_REQUEST },
      {
        type: actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
        payload: {
          ...expectedUpgradesNormalizedPayload,
          result: deliveryBundleId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      }),
    ).toMatchSnapshot('get delivery bundle upgrades success payload');
  });
});
