import { getProductGrouping } from '../index.js';
import {
  mockProductGrouping,
  mockProductId,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductGrouping.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductGrouping', () => {
  const expectedConfig = undefined;
  const query = { pageSize: 10 };
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductGrouping));

    await expect(getProductGrouping(mockProductId, query)).resolves.toEqual(
      mockProductGrouping,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/grouping?pageSize=10`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getProductGrouping(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/grouping?pageSize=10`,
      expectedConfig,
    );
  });
});
