import * as checkoutClient from '../index.js';
import {
  type CheckoutOrderDeliveryBundle,
  CheckoutOrderDeliveryWindowType,
} from '../types/index.js';
import { id } from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrderDeliveryBundles.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getCheckoutOrderDeliveryBundles', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: CheckoutOrderDeliveryBundle[] = [
      {
        id: 'string',
        name: 'string',
        isSelected: true,
        price: 0,
        finalPrice: 0,
        currency: 'string',
        rank: 0,
        itemsDeliveryOptions: [
          {
            itemId: 123,
            name: 'string',
            deliveryWindow: {
              type: CheckoutOrderDeliveryWindowType.Nominated,
              min: '2021-07-22T10:15:13.847Z',
              max: '2021-07-22T10:15:13.847Z',
            },
          },
        ],
      },
    ];

    mswServer.use(fixtures.success(response));

    await expect(
      checkoutClient.getCheckoutOrderDeliveryBundles(id),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      checkoutClient.getCheckoutOrderDeliveryBundles(id),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
