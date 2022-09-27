import { getOrderAvailableItemsActivities } from '..';
import {
  mockOrderAvailableItemsActivities,
  orderId,
} from 'tests/__fixtures__/orders';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOrderAvailableItemsActivities.fixtures';
import mswServer from '../../../tests/mswServer';

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
