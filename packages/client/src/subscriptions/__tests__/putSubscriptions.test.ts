import { mockPutSubscriptions } from 'tests/__fixtures__/subscriptions';
import { putSubscriptions } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putSubscriptions.fixtures';
import mswServer from '../../../tests/mswServer';

describe('putSubscriptions', () => {
  const spy = jest.spyOn(client, 'put');

  it('should handle a client request successfully', async () => {
    const response = {};

    mswServer.use(fixtures.success(response));

    await expect(
      putSubscriptions(mockPutSubscriptions.data),
    ).resolves.toStrictEqual(undefined);

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
