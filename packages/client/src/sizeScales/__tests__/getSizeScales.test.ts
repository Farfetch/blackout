import { getSizeScales } from '../';
import { mockSizeScale } from 'tests/__fixtures__/sizeScales';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSizeScales.fixtures';
import mswServer from '../../../tests/mswServer';

describe('sizeScales client', () => {
  const mockQuery = {
    categoryId: 136301,
  };
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getSizeScales()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = [mockSizeScale];

      mswServer.use(fixtures.success(response));

      await expect(getSizeScales(mockQuery)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/sizeScales?categoryId=136301',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getSizeScales(mockQuery)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/sizeScales?categoryId=136301',
        expectedConfig,
      );
    });
  });
});
