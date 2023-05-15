import { getSEOFiles } from '../index.js';
import {
  seoFilesData,
  seoFilesQuery,
} from 'tests/__fixtures__/contents/seoFiles.fixtures.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/seoFiles.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('SEO Files client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSEOFiles()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.get.success(seoFilesData));

      await expect(getSEOFiles(seoFilesQuery)).resolves.toEqual(seoFilesData);

      expect(spy).toHaveBeenCalledWith(
        '/content/v1/seofiles?hostId=1234&name=siteSEOFiles&page=1&pageSize=60',
        expectedConfig,
      );
    });

    it('should handle a client request error', async () => {
      mswServer.use(fixtures.get.failure());

      await expect(getSEOFiles(seoFilesQuery)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/content/v1/seofiles?hostId=1234&name=siteSEOFiles&page=1&pageSize=60',
        expectedConfig,
      );
    });
  });
});
