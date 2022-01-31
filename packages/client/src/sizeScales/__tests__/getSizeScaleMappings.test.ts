import { getSizeScaleMappings } from '../';
import {
  mockSizeScaleMappings,
  mockSizeScaleMappingsBrandId,
  mockSizeScaleMappingsGenderId,
  mockSizeScaleMappingsQuery,
  mockSizeScaleMappingsScaleId,
} from 'tests/__fixtures__/sizeScales';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSizeScaleMappings.fixtures';
import mswServer from '../../../tests/mswServer';

describe('sizeScaleMappings client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getSizeScaleMappings()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockSizeScaleMappings;

      mswServer.use(fixtures.success(response));
      expect.assertions(2);

      await expect(
        getSizeScaleMappings(mockSizeScaleMappingsQuery),
      ).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/sizeScaleMappings?brand=${mockSizeScaleMappingsBrandId}&gender=${mockSizeScaleMappingsGenderId}&sizeScale=${mockSizeScaleMappingsScaleId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());
      expect.assertions(2);

      await expect(
        getSizeScaleMappings(mockSizeScaleMappingsQuery),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/sizeScaleMappings?brand=${mockSizeScaleMappingsBrandId}&gender=${mockSizeScaleMappingsGenderId}&sizeScale=${mockSizeScaleMappingsScaleId}`,
        expectedConfig,
      );
    });
  });
});
