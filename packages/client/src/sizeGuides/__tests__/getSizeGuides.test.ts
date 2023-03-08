import { getSizeGuides } from '../index.js';
import {
  mockBrandId,
  mockCategoriesIds,
  mockQuery,
  mockSizeGuides,
} from 'tests/__fixtures__/sizeGuides/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getSizeGuides.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductSizeGuides', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockSizeGuides));

    await expect(getSizeGuides(mockQuery)).resolves.toEqual(mockSizeGuides);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sizeGuides?brandIds=${mockBrandId}&categoryIds=${mockCategoriesIds[0]}&categoryIds=${mockCategoriesIds[1]}&categoryIds=${mockCategoriesIds[2]}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getSizeGuides(mockQuery)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sizeGuides?brandIds=${mockBrandId}&categoryIds=${mockCategoriesIds[0]}&categoryIds=${mockCategoriesIds[1]}&categoryIds=${mockCategoriesIds[2]}`,
      expectedConfig,
    );
  });
});
