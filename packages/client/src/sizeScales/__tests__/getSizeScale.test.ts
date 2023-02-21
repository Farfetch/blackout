import { getSizeScale } from '../';
import { mockScaleId, mockSizeScale } from 'tests/__fixtures__/sizeScales';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSizeScale.fixtures';
import mswServer from '../../../tests/mswServer';

describe('sizeScales client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getSizeScale()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockSizeScale));

      await expect(getSizeScale(mockScaleId)).resolves.toEqual(mockSizeScale);

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/sizeScales/${mockScaleId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getSizeScale(mockScaleId)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/sizeScales/${mockScaleId}`,
        expectedConfig,
      );
    });
  });
});
