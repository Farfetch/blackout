import { deleteSubscription } from '..';
import { mockDeleteSubscription } from 'tests/__fixtures__/subscriptions';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteSubscription.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('deleteSubscription', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockDeleteSubscription.response));

    await expect(
      deleteSubscription(mockDeleteSubscription.query),
    ).resolves.toStrictEqual(mockDeleteSubscription.response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', {
        query: mockDeleteSubscription.query,
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteSubscription(mockDeleteSubscription.query),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', {
        query: mockDeleteSubscription.query,
      }),
      expectedConfig,
    );
  });
});
