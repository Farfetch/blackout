import { deleteSubscription } from '..';
import { mockDeleteSubscription } from 'tests/__fixtures__/subscriptions';
import client from '../../helpers/client';
import join from 'proper-url-join';
import moxios from 'moxios';
import moxiosFixtures from '../__fixtures__/deleteSubscription.fixtures';

describe('deleteSubscription', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    moxiosFixtures.success(
      mockDeleteSubscription.query,
      mockDeleteSubscription.response,
    );

    await expect(
      deleteSubscription(mockDeleteSubscription.query),
    ).resolves.toBe(mockDeleteSubscription.response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', {
        query: mockDeleteSubscription.query,
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    moxiosFixtures.failure(mockDeleteSubscription.query);

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
