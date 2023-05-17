import { getCategories } from '..//index.js';
import { mockCategories } from 'tests/__fixtures__/categories/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCategories.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getCategories()', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockCategories));

    await expect(getCategories()).resolves.toEqual(mockCategories);

    expect(spy).toHaveBeenCalledWith('/commerce/v1/categories', expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getCategories()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith('/commerce/v1/categories', expectedConfig);
  });
});
