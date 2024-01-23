import { getSubscriptionsVNext } from '../index.js';
import { mockGetSubscriptionsVNext } from 'tests/__fixtures__/subscriptions/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getSubscriptions.vnext.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('getSubscriptionsVNext', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const defaultUrl = join('/marketing/vNext/Subscriptions', {
    query: mockGetSubscriptionsVNext.query,
  });

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetSubscriptionsVNext.response));

    await expect(
      getSubscriptionsVNext(mockGetSubscriptionsVNext.query),
    ).resolves.toEqual(mockGetSubscriptionsVNext.response);

    expect(spy).toHaveBeenCalledWith(defaultUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getSubscriptionsVNext(mockGetSubscriptionsVNext.query),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(defaultUrl, expectedConfig);
  });
});
