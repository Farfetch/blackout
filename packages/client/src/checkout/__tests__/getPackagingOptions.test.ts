import * as checkoutClient from '../index.js';
import { mockPackagingOptionsResponse } from 'tests/__fixtures__/checkout/packagingOptions.fixtures.mjs';
import { type PackagingOption } from '../types/index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getPackagingOptions.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getPackagingOptions', () => {
    const spy = jest.spyOn(client, 'get');
    const query = { channelCode: 'code' };
    const urlToBeCalled = `/checkout/v1/packagingOptions?channelCode=${query.channelCode}`;

    it('should handle a client request successfully', async () => {
      const response: PackagingOption[] = mockPackagingOptionsResponse;

      mswServer.use(fixtures.success(response));

      await expect(
        checkoutClient.getPackagingOptions(query),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.getPackagingOptions(query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
