import {
  mockData,
  mockResponse,
} from 'tests/__fixtures__/subscriptions/putSubscriptions.fixtures';
import { putSubscriptions } from '..';
import client from '../../helpers/client';
import moxios from 'moxios';
import moxiosFixtures from '../__fixtures__/putSubscriptions.fixtures';

describe('putSubscriptions', () => {
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    moxiosFixtures.success(mockResponse);

    await expect(putSubscriptions(mockData)).resolves.toBe(mockResponse);

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/subscriptions',
      mockData,
      undefined,
    );
  });

  it('should receive a client request error', async () => {
    moxiosFixtures.failure();

    await expect(putSubscriptions(mockData)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/subscriptions',
      mockData,
      undefined,
    );
  });
});
