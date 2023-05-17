import { mockPutSubscriptions } from 'tests/__fixtures__/subscriptions/index.mjs';
import { putSubscriptions } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/putSubscriptions.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('putSubscriptions', () => {
  const spy = jest.spyOn(client, 'put');

  it('should handle a client request successfully', async () => {
    const response = {};

    mswServer.use(fixtures.success(response));

    await expect(
      putSubscriptions(mockPutSubscriptions.data),
    ).resolves.toBeUndefined();

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/subscriptions',
      mockPutSubscriptions.data,
      undefined,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      putSubscriptions(mockPutSubscriptions.data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/subscriptions',
      mockPutSubscriptions.data,
      undefined,
    );
  });
});
