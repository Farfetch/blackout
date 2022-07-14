import { getProductGroupingProperties } from '..';
import {
  mockGroupingProperties,
  mockProductId,
} from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getProductGroupingProperties.fixtures';
import moxios from 'moxios';

describe('getProductGroupingProperties', () => {
  const expectedConfig = undefined;
  const query = { hasStock: true };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockGroupingProperties;

    fixtures.success({
      id: mockProductId,
      query,
      response,
    });

    await expect(
      getProductGroupingProperties(mockProductId, query),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/groupingProperties?hasStock=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id: mockProductId,
      query,
    });

    await expect(
      getProductGroupingProperties(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/groupingProperties?hasStock=true`,
      expectedConfig,
    );
  });
});
