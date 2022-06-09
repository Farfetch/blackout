import { getPrograms } from '..';
import { mockResponsePrograms } from 'tests/__fixtures__/loyalty';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPrograms.fixtures';
import mswServer from '../../../tests/mswServer';

describe('programs client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getPrograms', () => {
    const spy = jest.spyOn(client, 'get');
    const apiPath = '/loyalty/v1/programs';

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockResponsePrograms));

      expect.assertions(2);
      await expect(getPrograms()).resolves.toStrictEqual(mockResponsePrograms);
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);
      await expect(getPrograms()).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });
  });
});
