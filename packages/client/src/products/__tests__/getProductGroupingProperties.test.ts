import { getProductGroupingProperties } from '..';
import {
  mockProductGroupingProperties,
  mockProductId,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductGroupingProperties.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getProductGroupingProperties', () => {
  const expectedConfig = undefined;
  const query = { hasStock: true };
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductGroupingProperties));

    expect.assertions(2);

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

    expect.assertions(2);

    await expect(
      getProductGroupingProperties(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/groupingProperties?hasStock=true`,
      expectedConfig,
    );
  });
});
