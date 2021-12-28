import { getPrograms } from '..';
import { mockResponsePrograms } from 'tests/__fixtures__/loyalty';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPrograms.fixtures';
import moxios from 'moxios';

describe('programs client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getPrograms', () => {
    const spy = jest.spyOn(client, 'get');
    const apiPath = '/loyalty/v1/programs';

    it('should handle a client request successfully', async () => {
      fixtures.success({ response: mockResponsePrograms });

      expect.assertions(2);
      await expect(getPrograms()).resolves.toBe(mockResponsePrograms);
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      expect.assertions(2);
      await expect(getPrograms()).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });
  });
});
