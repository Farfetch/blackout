import * as actionTypes from '../../actionTypes';
import {
  checkoutId,
  mockDeliveryBundlesResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import {
  patchCheckoutOrderDeliveryBundleUpgrades,
  PatchCheckoutOrderDeliveryBundleUpgradesData,
} from '@farfetch/blackout-client';
import { updateCheckoutOrderDeliveryBundleUpgrades } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchCheckoutOrderDeliveryBundleUpgrades: jest.fn(),
}));

describe('updateCheckoutOrderDeliveryBundleUpgrades() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const deliveryBundleId = mockDeliveryBundlesResponse[0]?.id as string;
  const data: PatchCheckoutOrderDeliveryBundleUpgradesData[] = [
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
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update checkout order delivery bundle upgrades procedure fails', async () => {
    const expectedError = new Error(
      'update checkout order delivery bundle upgrades error',
    );

    (
      patchCheckoutOrderDeliveryBundleUpgrades as jest.Mock
    ).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await updateCheckoutOrderDeliveryBundleUpgrades(
      checkoutId,
      deliveryBundleId,
      data,
    )(store.dispatch).catch(error => {
      expect(error).toBe(expectedError);
      expect(patchCheckoutOrderDeliveryBundleUpgrades).toHaveBeenCalledTimes(1);
      expect(patchCheckoutOrderDeliveryBundleUpgrades).toHaveBeenCalledWith(
        checkoutId,
        deliveryBundleId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST,
          },
          {
            type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the update checkout order delivery bundle upgrades procedure is successful', async () => {
    (
      patchCheckoutOrderDeliveryBundleUpgrades as jest.Mock
    ).mockResolvedValueOnce(200);

    await updateCheckoutOrderDeliveryBundleUpgrades(
      checkoutId,
      deliveryBundleId,
      data,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(200);
    });

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(patchCheckoutOrderDeliveryBundleUpgrades).toHaveBeenCalledTimes(1);
    expect(patchCheckoutOrderDeliveryBundleUpgrades).toHaveBeenCalledWith(
      checkoutId,
      deliveryBundleId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      },
      {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
      }),
    ).toMatchSnapshot(
      'update checkout order delivery bundle upgrades success payload',
    );
  });
});
