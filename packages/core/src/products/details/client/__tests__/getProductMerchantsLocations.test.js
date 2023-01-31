import { getProductMerchantsLocations } from '..';
import {
  mockMerchantsLocations,
  mockProductId,
  mockVariantId,
} from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getProductMerchantsLocations.fixtures';
import moxios from 'moxios';

describe('getProductMerchantsLocations', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockMerchantsLocations;

    fixtures.success({
      productId: mockProductId,
      variantId: mockVariantId,
      response,
    });

    expect.assertions(2);

    await expect(
      getProductMerchantsLocations(mockProductId, mockVariantId),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variants/${mockVariantId}/merchantsLocations`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      productId: mockProductId,
      variantId: mockVariantId,
    });

    expect.assertions(2);
    await expect(
      getProductMerchantsLocations(mockProductId, mockVariantId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variants/${mockVariantId}/merchantsLocations`,
      expectedConfig,
    );
  });
});
