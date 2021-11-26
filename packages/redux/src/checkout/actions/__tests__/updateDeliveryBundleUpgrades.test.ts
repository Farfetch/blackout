import { actionTypes } from '../..';
import {
  checkoutId,
  mockDeliveryBundlesResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchDeliveryBundleUpgrades } from '@farfetch/blackout-client/checkout';
import { updateDeliveryBundleUpgrades } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  patchDeliveryBundleUpgrades: jest.fn(),
}));

describe('updateDeliveryBundleUpgrades() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0].id;
  const data = [
    {
      op: 'replace',
      path: '0/isSelected',
      value: 'true',
    },
    {
      op: 'test',
      path: '0/id',
      value: '25314851',
    },
    {
      op: 'replace',
      path: '1/isSelected',
      value: 'true',
    },
    {
      op: 'test',
      path: '1/id',
      value: '37473649',
    },
  ];
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update delivery bundle upgrades procedure fails', async () => {
    const expectedError = new Error('update delivery bundle upgrades error');

    patchDeliveryBundleUpgrades.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(
        updateDeliveryBundleUpgrades(checkoutId, deliveryBundleId, data),
      );
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchDeliveryBundleUpgrades).toHaveBeenCalledTimes(1);
      expect(patchDeliveryBundleUpgrades).toHaveBeenCalledWith(
        checkoutId,
        deliveryBundleId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST,
          },
          {
            type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update delivery bundle upgrades procedure is successful', async () => {
    patchDeliveryBundleUpgrades.mockResolvedValueOnce();
    await store.dispatch(
      updateDeliveryBundleUpgrades(checkoutId, deliveryBundleId, data),
    );
    const actionResults = store.getActions();

    expect.assertions(4);
    expect(patchDeliveryBundleUpgrades).toHaveBeenCalledTimes(1);
    expect(patchDeliveryBundleUpgrades).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      },
      {
        type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      }),
    ).toMatchSnapshot('update delivery bundle upgrades success payload');
  });
});
