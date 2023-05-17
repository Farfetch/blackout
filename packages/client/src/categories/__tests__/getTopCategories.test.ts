import { getTopCategories } from '../index.js';
import { mockTopCategories } from 'tests/__fixtures__/categories/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getTopCategories.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getTopCategories()', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockTopCategories));

    await expect(getTopCategories()).resolves.toEqual(mockTopCategories);

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/categories/top',
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getTopCategories()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/categories/top',
      expectedConfig,
    );
  });
});
