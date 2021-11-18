import { getSubscriptions } from '../';
import client from '../../../helpers/client';
import fixtures from '../__mocks__/getSubscriptions.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getSubscriptions', () => {
  const expectedConfig = undefined;
  const query = {
    customerId: 'user@email.com',
    packageId: ['Newsletter'],
  };
  const response = {
    id: '8c2b5c3e3acb4bdd9c26ba46',
    topics: [
      {
        type: 'Latest_News',
        channels: [
          {
            platform: 'email',
            address: 'user1_test1@acme.com',
            source: 'My Account',
          },
        ],
      },
      {
        type: 'Promotions',
        channels: [
          {
            platform: 'email',
            address: 'user1_test1@acme.com',
            source: 'My Account',
          },
          {
            platform: 'sms',
            address: '1234567890',
            source: 'My Account',
          },
        ],
      },
    ],
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success(query, response);

    await expect(getSubscriptions(query)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(query);

    await expect(getSubscriptions(query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', { query }),
      expectedConfig,
    );
  });
});
