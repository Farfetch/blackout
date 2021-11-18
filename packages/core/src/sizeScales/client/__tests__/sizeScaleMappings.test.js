import { getSizeScaleMappings } from '../';
import {
  mockSizeScaleMappings,
  mockSizeScaleMappingsBrandId,
  mockSizeScaleMappingsGenderId,
  mockSizeScaleMappingsQuery,
  mockSizeScaleMappingsScaleId,
} from 'tests/__fixtures__/sizeScales';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSizeScaleMappings.fixtures';
import moxios from 'moxios';

describe('sizeScaleMappings client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSizeScaleMappings()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockSizeScaleMappings;

      fixtures.success({
        query: mockSizeScaleMappingsQuery,
        response,
      });

      await expect(
        getSizeScaleMappings(mockSizeScaleMappingsQuery),
      ).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/sizeScaleMappings?brand=${mockSizeScaleMappingsBrandId}&gender=${mockSizeScaleMappingsGenderId}&sizeScale=${mockSizeScaleMappingsScaleId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        query: mockSizeScaleMappingsQuery,
      });

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
