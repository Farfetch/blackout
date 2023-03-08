import { getProductVariantsMeasurements } from '../index.js';
import {
  mockProductId,
  mockProductVariantsMeasurements,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductVariantsMeasurements.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductVariantsMeasurements', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductVariantsMeasurements));

    await expect(
      getProductVariantsMeasurements(mockProductId),
    ).resolves.toEqual(mockProductVariantsMeasurements);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variantsMeasurements`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getProductVariantsMeasurements(mockProductId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variantsMeasurements`,
      expectedConfig,
    );
  });
});
