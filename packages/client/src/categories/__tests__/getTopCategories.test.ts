import { getTopCategories } from '..';
import { mockTopCategories } from 'tests/__fixtures__/categories';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getTopCategories.fixtures';
import mswServer from '../../../tests/mswServer';

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
