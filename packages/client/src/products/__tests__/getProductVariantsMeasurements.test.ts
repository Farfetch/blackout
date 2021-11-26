import { getProductVariantsMeasurements } from '..';
import {
  mockProductId,
  mockProductVariantsMeasurements,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductVariantsMeasurements.fixtures';
import moxios from 'moxios';

describe('getProductVariantsMeasurements', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockProductVariantsMeasurements;

    fixtures.success({
      id: mockProductId,
      response,
    });

    await expect(getProductVariantsMeasurements(mockProductId)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variantsMeasurements`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id: mockProductId,
    });

    await expect(
      getProductVariantsMeasurements(mockProductId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/variantsMeasurements`,
      expectedConfig,
    );
  });
});
