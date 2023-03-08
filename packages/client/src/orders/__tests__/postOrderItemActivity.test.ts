import { orderId, orderItemId } from 'tests/__fixtures__/orders/index.mjs';
import { OrderItemActivityType, postOrderItemActivity } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postOrderItemActivity.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

const activity = {
  type: OrderItemActivityType.Cancel,
};

beforeEach(() => jest.clearAllMocks());

describe('postOrderItemActivity', () => {
  const spy = jest.spyOn(client, 'post');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(
      postOrderItemActivity(orderId, orderItemId, activity),
    ).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/items/${orderItemId}/activities`,
      activity,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postOrderItemActivity(orderId, orderItemId, activity),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/orders/${orderId}/items/${orderItemId}/activities`,
      activity,
      expectedConfig,
    );
  });
});
