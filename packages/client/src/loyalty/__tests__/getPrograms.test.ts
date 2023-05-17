import { getPrograms } from '../index.js';
import { mockResponsePrograms } from 'tests/__fixtures__/loyalty/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getPrograms.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('programs client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getPrograms', () => {
    const spy = jest.spyOn(client, 'get');
    const apiPath = '/loyalty/v1/programs';

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockResponsePrograms));

      await expect(getPrograms()).resolves.toStrictEqual(mockResponsePrograms);
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getPrograms()).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });
  });
});
