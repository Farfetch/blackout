import { getTopCategories } from '..';
import { mockTopCategories } from 'tests/__fixtures__/categories';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getTopCategories.fixtures';
import moxios from 'moxios';

describe('getTopCategories()', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({
      response: mockTopCategories,
    });

    await expect(getTopCategories()).resolves.toEqual(mockTopCategories);
    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/categories/top',
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    await expect(getTopCategories()).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/categories/top',
      expectedConfig,
    );
  });
});
