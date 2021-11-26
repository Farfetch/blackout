import { getSubscriptionPackages } from '..';
import {
  mockQuery,
  mockResponse,
} from 'tests/__fixtures__/subscriptions/getSubscriptionPackages.fixtures';
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
    moxiosFixtures.success(mockQuery, mockResponse);

    await expect(getSubscriptionPackages(mockQuery)).resolves.toBe(
      mockResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptionpackages', { query: mockQuery }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    moxiosFixtures.failure(mockQuery);

    await expect(getSubscriptionPackages(mockQuery)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptionpackages', { query: mockQuery }),
      expectedConfig,
    );
  });
});
