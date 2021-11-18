import { getCategoriesTop } from '..';
import { mockTopCategories } from 'tests/__fixtures__/categories';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getCategoriesTop.fixtures';
import moxios from 'moxios';

describe('getCategoriesTop()', () => {
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

    await expect(getCategoriesTop()).resolves.toEqual(mockTopCategories);
    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/categories/top',
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    await expect(getCategoriesTop()).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/categories/top',
      expectedConfig,
    );
  });
});
