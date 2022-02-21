import { getSubscriptionPackages } from '..';
import { mockGetSubscriptionPackages } from 'tests/__fixtures__/subscriptions';
import client from '../../helpers/client';
import join from 'proper-url-join';
import moxios from 'moxios';
import moxiosFixtures from '../__fixtures__/getSubscriptionPackages.fixtures';

describe('getSubscriptionPackages', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    moxiosFixtures.success(
      mockGetSubscriptionPackages.query,
      mockGetSubscriptionPackages.response,
    );

    await expect(
      getSubscriptionPackages(mockGetSubscriptionPackages.query),
    ).resolves.toBe(mockGetSubscriptionPackages.response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptionpackages', {
        query: mockGetSubscriptionPackages.query,
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    moxiosFixtures.failure(mockGetSubscriptionPackages.query);

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
