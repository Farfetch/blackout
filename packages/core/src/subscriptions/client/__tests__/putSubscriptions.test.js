import { putSubscriptions } from '../';
import client from '../../../helpers/client';
import fixtures from '../__mocks__/putSubscriptions.fixtures';
import moxios from 'moxios';

describe('putSubscriptions', () => {
  const expectedConfig = undefined;
  const data = {
    id: '8c2b5c3e3acb4bdd9c26ba46',
    customerId: 'user@email.com',
    topics: [
      {
        type: 'Latest_News',
        channels: [
          {
            platform: 'email',
            address: 'user1_test1@acme.com',
            source: 'My Account',
            active: true,
          },
        ],
      },
      {
        type: 'Promotions',
        channels: [
          {
            platform: 'sms',
            address: '919191919',
            source: 'My Account',
            active: true,
          },
        ],
      },
    ],
  };
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success(undefined);

    await expect(putSubscriptions(data)).resolves.toBe(undefined);

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/subscriptions',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    await expect(putSubscriptions(data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/subscriptions',
      data,
      expectedConfig,
    );
  });
});
