import { getCategories } from '../';
import { mockCategories } from 'tests/__fixtures__/categories';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getCategories.fixtures';
import moxios from 'moxios';

describe('getCategories()', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({
      response: mockCategories,
    });

    await expect(getCategories()).resolves.toBe(mockCategories);
    expect(spy).toHaveBeenCalledWith('/commerce/v1/categories', expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    await expect(getCategories()).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith('/commerce/v1/categories', expectedConfig);
  });
});
