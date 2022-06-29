import { getProductVariantsMerchantsLocations } from '..';
import {
  mockProductId,
  mockProductVariantsMerchantsLocationsNormalizedResponse,
  mockVariantId,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductVariantMerchantsLocations.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getProductVariantsMerchantsLocations', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(
      fixtures.success(mockProductVariantsMerchantsLocationsNormalizedResponse),
    );

    expect.assertions(2);

    await expect(
      getProductVariantsMerchantsLocations(mockProductId, mockVariantId),
    ).resolves.toEqual(mockProductVariantsMerchantsLocationsNormalizedResponse);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variants/${mockVariantId}/merchantsLocations`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      getProductVariantsMerchantsLocations(mockProductId, mockVariantId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variants/${mockVariantId}/merchantsLocations`,
      expectedConfig,
    );
  });
});
