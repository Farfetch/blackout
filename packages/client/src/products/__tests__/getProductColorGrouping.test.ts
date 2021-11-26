import { getProductColorGrouping } from '..';
import {
  mockProductColorGrouping,
  mockProductId,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductColorGrouping.fixtures';
import moxios from 'moxios';

describe('getProductColorGrouping', () => {
  const expectedConfig = undefined;
  const query = { pageSize: 10 };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockProductColorGrouping;

    fixtures.success({
      id: mockProductId,
      query,
      response,
    });

    await expect(getProductColorGrouping(mockProductId, query)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/colorgrouping?pageSize=10`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id: mockProductId,
      query,
    });

    await expect(
      getProductColorGrouping(mockProductId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/colorgrouping?pageSize=10`,
      expectedConfig,
    );
  });
});
