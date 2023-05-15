import * as checkoutClient from '../index.js';
import {
  type CheckoutOrderDeliveryBundleUpgrades,
  CheckoutOrderDeliveryWindowType,
} from '../types/index.js';
import { deliveryBundleId, id } from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrderDeliveryBundleUpgrades.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getCheckoutOrderDeliveryBundleUpgrades', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: CheckoutOrderDeliveryBundleUpgrades = {
      123: {
        Nominated: [
          {
            id: 'string',
            name: 'string',
            isSelected: true,
            price: 0,
            formattedPrice: 'string',
            currency: 'string',
            rank: 0,
            itemId: 123,
            deliveryWindow: {
              type: CheckoutOrderDeliveryWindowType.Nominated,
              min: '2021-07-22T10:15:13.847Z',
              max: '2021-07-22T10:15:13.847Z',
            },
            index: 0,
          },
        ],
        Estimated: [
          {
            id: 'string',
            name: 'string',
            isSelected: true,
            price: 0,
            formattedPrice: 'string',
            currency: 'string',
            rank: 0,
            itemId: 123,
            deliveryWindow: {
              type: CheckoutOrderDeliveryWindowType.Nominated,
              min: '2021-07-22T10:15:13.847Z',
              max: '2021-07-22T10:15:13.847Z',
            },
            index: 0,
          },
        ],
      },
      456: {
        Nominated: [
          {
            id: 'string',
            name: 'string',
            isSelected: true,
            price: 0,
            formattedPrice: 'string',
            currency: 'string',
            rank: 0,
            itemId: 456,
            deliveryWindow: {
              type: CheckoutOrderDeliveryWindowType.Nominated,
              min: '2021-07-22T10:15:13.847Z',
              max: '2021-07-22T10:15:13.847Z',
            },
            index: 0,
          },
        ],
        Estimated: [
          {
            id: 'string',
            name: 'string',
            isSelected: true,
            price: 0,
            formattedPrice: 'string',
            currency: 'string',
            rank: 0,
            itemId: 456,
            deliveryWindow: {
              type: CheckoutOrderDeliveryWindowType.Nominated,
              min: '2021-07-22T10:15:13.847Z',
              max: '2021-07-22T10:15:13.847Z',
            },
            index: 0,
          },
        ],
      },
      789: {
        Nominated: [
          {
            id: 'string',
            name: 'string',
            isSelected: true,
            price: 0,
            formattedPrice: 'string',
            currency: 'string',
            rank: 0,
            itemId: 789,
            deliveryWindow: {
              type: CheckoutOrderDeliveryWindowType.Nominated,
              min: '2021-07-22T10:15:13.847Z',
              max: '2021-07-22T10:15:13.847Z',
            },
            index: 0,
          },
        ],
        Estimated: [
          {
            id: 'string',
            name: 'string',
            isSelected: true,
            price: 0,
            formattedPrice: 'string',
            currency: 'string',
            rank: 0,
            itemId: 789,
            deliveryWindow: {
              type: CheckoutOrderDeliveryWindowType.Nominated,
              min: '2021-07-22T10:15:13.847Z',
              max: '2021-07-22T10:15:13.847Z',
            },
            index: 0,
          },
        ],
      },
    };

    mswServer.use(fixtures.success(response));

    await expect(
      checkoutClient.getCheckoutOrderDeliveryBundleUpgrades(
        id,
        deliveryBundleId,
      ),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      checkoutClient.getCheckoutOrderDeliveryBundleUpgrades(
        id,
        deliveryBundleId,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
