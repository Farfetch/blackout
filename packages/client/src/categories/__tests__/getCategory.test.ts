import { getCategory } from '../';
import { mockCategory, mockCategoryId } from 'tests/__fixtures__/categories';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCategory.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getCategory()', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockCategory));
    expect.assertions(2);

    await expect(getCategory(mockCategoryId)).resolves.toEqual(mockCategory);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/categories/${mockCategoryId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(getCategory(mockCategoryId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/categories/${mockCategoryId}`,
      expectedConfig,
    );
  });
});
