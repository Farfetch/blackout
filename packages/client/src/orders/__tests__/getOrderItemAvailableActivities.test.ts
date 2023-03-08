import { getOrderItemAvailableActivities } from '../index.js';
import {
  mockOrderItemAvailableActivities,
  orderId,
  orderItemId,
} from 'tests/__fixtures__/orders/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getOrderItemAvailableActivities.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getOrderItemAvailableActivities', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockOrderItemAvailableActivities));

    await expect(
      getOrderItemAvailableActivities(orderId, orderItemId),
    ).resolves.toStrictEqual(mockOrderItemAvailableActivities);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/items/${orderItemId}/availableActivities`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getOrderItemAvailableActivities(orderId, orderItemId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/items/${orderItemId}/availableActivities`,
      expectedConfig,
    );
  });
});
