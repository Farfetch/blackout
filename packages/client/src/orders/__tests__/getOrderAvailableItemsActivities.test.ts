import { getOrderAvailableItemsActivities } from '../index.js';
import {
  mockOrderAvailableItemsActivities,
  orderId,
} from 'tests/__fixtures__/orders/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getOrderAvailableItemsActivities.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getOrderAvailableItemsActivities', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockOrderAvailableItemsActivities));

    await expect(
      getOrderAvailableItemsActivities(orderId),
    ).resolves.toStrictEqual(mockOrderAvailableItemsActivities);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/availableItemsActivities`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getOrderAvailableItemsActivities(orderId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/availableItemsActivities`,
      expectedConfig,
    );
  });
});
