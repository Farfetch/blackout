// @TODO: Remove this file in version 2.0.0.
import { getSiteFeatures } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSiteFeatures.fixtures';
import moxios from 'moxios';

describe('sitefeatures client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSiteFeatures', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = {};

      fixtures.success({
        response,
      });

      expect.assertions(2);

      await expect(getSiteFeatures()).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        '/settings/v1/sitefeatures',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      expect.assertions(2);

      await expect(getSiteFeatures()).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/settings/v1/sitefeatures',
        expectedConfig,
      );
    });
  });
});
