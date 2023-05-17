import { getProductVariantsMerchantsLocations } from '../index.js';
import {
  mockProductId,
  mockProductVariantsMerchantsLocations,
  mockVariantId,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductVariantMerchantsLocations.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductVariantsMerchantsLocations', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductVariantsMerchantsLocations));

    await expect(
      getProductVariantsMerchantsLocations(mockProductId, mockVariantId),
    ).resolves.toEqual(mockProductVariantsMerchantsLocations);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variants/${mockVariantId}/merchantsLocations`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getProductVariantsMerchantsLocations(mockProductId, mockVariantId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variants/${mockVariantId}/merchantsLocations`,
      expectedConfig,
    );
  });
});
