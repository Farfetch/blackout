import { getSizeScales } from '../';
import { mockSizeScale } from 'tests/__fixtures__/sizeScales';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSizeScales.fixtures';
import moxios from 'moxios';

describe('sizeScales client', () => {
  const mockQuery = {
    categoryId: 136301,
  };
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSizeScales()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = [mockSizeScale];

      fixtures.success({
        query: mockQuery,
        response,
      });

      await expect(getSizeScales(mockQuery)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/sizeScales?categoryId=136301',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        query: mockQuery,
      });

      await expect(getSizeScales(mockQuery)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/sizeScales?categoryId=136301',
        expectedConfig,
      );
    });
  });
});
