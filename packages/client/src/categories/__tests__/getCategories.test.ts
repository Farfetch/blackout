import { getCategories } from '../';
import { mockCategories } from 'tests/__fixtures__/categories';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCategories.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getCategories()', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockCategories));
    expect.assertions(2);

    await expect(getCategories()).resolves.toEqual(mockCategories);

    expect(spy).toHaveBeenCalledWith('/commerce/v1/categories', expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(getCategories()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith('/commerce/v1/categories', expectedConfig);
  });
});
