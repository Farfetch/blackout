import { getProductGroupingProperties } from '../index.js';
import {
  mockProductGroupingProperties,
  mockProductId,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductGroupingProperties.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductGroupingProperties', () => {
  const expectedConfig = undefined;
  const query = { hasStock: true };
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductGroupingProperties));

    await expect(
      getProductGroupingProperties(mockProductId, query),
    ).resolves.toEqual(mockProductGroupingProperties);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/groupingProperties?hasStock=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getProductGroupingProperties(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/groupingProperties?hasStock=true`,
      expectedConfig,
    );
  });
});
