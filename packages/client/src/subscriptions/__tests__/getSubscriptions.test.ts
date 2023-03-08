import { getSubscriptions } from '../index.js';
import { mockGetSubscriptions } from 'tests/__fixtures__/subscriptions/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getSubscriptions.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('getSubscriptions', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    const response = [{ ...mockGetSubscriptions.response }];

    mswServer.use(fixtures.success(response));

    await expect(
      getSubscriptions(mockGetSubscriptions.query),
    ).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', {
        query: mockGetSubscriptions.query,
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getSubscriptions(mockGetSubscriptions.query),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', {
        query: mockGetSubscriptions.query,
      }),
      expectedConfig,
    );
  });
});
