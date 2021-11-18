import { getSubscriptionPackages } from '../';
import client from '../../../helpers/client';
import fixtures from '../__mocks__/getSubscriptionPackages.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getSubscriptionPackages', () => {
  const expectedConfig = undefined;
  const query = { id: ['Newsletter'] };
  const response = {
    supportedChannels: ['sms', 'email'],
    entries: [
      {
        name: 'Newsletter',
        topics: [
          {
            type: 'Latest_News',
            channels: ['email'],
          },
          {
            type: 'Promotions',
            channels: ['sms', 'email'],
          },
        ],
      },
    ],
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success(query, response);

    await expect(getSubscriptionPackages(query)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptionpackages', { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(query);

    await expect(getSubscriptionPackages(query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptionpackages', { query }),
      expectedConfig,
    );
  });
});
