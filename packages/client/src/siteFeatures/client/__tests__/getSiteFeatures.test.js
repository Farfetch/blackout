// @TODO: Remove this file in version 2.0.0.
import { getSiteFeatures } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSiteFeatures.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('sitefeatures client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getSiteFeatures', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = {};

      mswServer.use(fixtures.success(response));

      expect.assertions(2);

      await expect(getSiteFeatures()).resolves.toStrictEqual(response);

      expect(spy).toHaveBeenCalledWith(
        '/settings/v1/sitefeatures',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(getSiteFeatures()).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/settings/v1/sitefeatures',
        expectedConfig,
      );
    });
  });
});
