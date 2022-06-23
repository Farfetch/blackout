import { mockPutSubscriptions } from 'tests/__fixtures__/subscriptions';
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
    const mockResponse = undefined;
    moxiosFixtures.success({ response: mockResponse });

    await expect(putSubscriptions(mockPutSubscriptions.data)).resolves.toBe(
      mockResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/subscriptions',
      mockPutSubscriptions.data,
      undefined,
    );
  });

  it('should receive a client request error', async () => {
    moxiosFixtures.failure();

    await expect(
      putSubscriptions(mockPutSubscriptions.data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/marketing/v1/subscriptions',
      mockPutSubscriptions.data,
      undefined,
    );
  });
});
