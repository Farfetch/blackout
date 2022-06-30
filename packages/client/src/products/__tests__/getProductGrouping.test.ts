import { getProductGrouping } from '..';
import {
  mockProductGrouping,
  mockProductId,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductGrouping.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getProductGrouping', () => {
  const expectedConfig = undefined;
  const query = { pageSize: 10 };
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductGrouping));

    expect.assertions(2);

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

    expect.assertions(2);

    await expect(
      getProductGrouping(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/grouping?pageSize=10`,
      expectedConfig,
    );
  });
});
