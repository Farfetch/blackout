import { getProductGrouping } from '..';
import { mockGrouping, mockProductId } from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getProductGrouping.fixtures';
import moxios from 'moxios';

describe('getProductGrouping', () => {
  const expectedConfig = undefined;
  const query = { pageSize: 10 };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockGrouping;

    fixtures.success({
      id: mockProductId,
      query,
      response,
    });

    await expect(getProductGrouping(mockProductId, query)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/grouping?pageSize=10`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id: mockProductId,
      query,
    });

    await expect(
      getProductGrouping(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/grouping?pageSize=10`,
      expectedConfig,
    );
  });
});
