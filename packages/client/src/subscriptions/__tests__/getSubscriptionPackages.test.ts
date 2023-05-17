import { getSubscriptionPackages } from '../index.js';
import { mockGetSubscriptionPackages } from 'tests/__fixtures__/subscriptions/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getSubscriptionPackages.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('getSubscriptionPackages', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetSubscriptionPackages.response));

    await expect(
      getSubscriptionPackages(mockGetSubscriptionPackages.query),
    ).resolves.toStrictEqual(mockGetSubscriptionPackages.response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptionpackages', {
        query: mockGetSubscriptionPackages.query,
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getSubscriptionPackages(mockGetSubscriptionPackages.query),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptionpackages', {
        query: mockGetSubscriptionPackages.query,
      }),
      expectedConfig,
    );
  });
});
