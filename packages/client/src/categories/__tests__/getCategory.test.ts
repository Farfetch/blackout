import { getCategory } from '..//index.js';
import {
  mockCategory,
  mockCategoryId,
} from 'tests/__fixtures__/categories/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCategory.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getCategory()', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockCategory));

    await expect(getCategory(mockCategoryId)).resolves.toEqual(mockCategory);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/categories/${mockCategoryId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getCategory(mockCategoryId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/categories/${mockCategoryId}`,
      expectedConfig,
    );
  });
});
