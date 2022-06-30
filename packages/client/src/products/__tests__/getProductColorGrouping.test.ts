import { getProductColorGrouping } from '..';
import {
  mockProductColorGrouping,
  mockProductId,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductColorGrouping.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getProductColorGrouping', () => {
  const expectedConfig = undefined;
  const query = { pageSize: 10 };
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductColorGrouping));

    expect.assertions(2);

    await expect(
      getProductColorGrouping(mockProductId, query),
    ).resolves.toEqual(mockProductColorGrouping);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/colorgrouping?pageSize=10`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      getProductColorGrouping(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/colorgrouping?pageSize=10`,
      expectedConfig,
    );
  });
});
