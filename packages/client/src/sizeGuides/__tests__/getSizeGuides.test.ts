import { getSizeGuides } from '..';
import {
  mockBrandId,
  mockCategoriesIds,
  mockQuery,
  mockSizeGuides,
} from 'tests/__fixtures__/sizeGuides';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSizeGuides.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getProductSizeGuides', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockSizeGuides;

    mswServer.use(fixtures.success(response));
    expect.assertions(2);

    await expect(getSizeGuides(mockQuery)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sizeGuides?brandIds=${mockBrandId}&categoryIds=${mockCategoriesIds[0]}&categoryIds=${mockCategoriesIds[1]}&categoryIds=${mockCategoriesIds[2]}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(getSizeGuides(mockQuery)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sizeGuides?brandIds=${mockBrandId}&categoryIds=${mockCategoriesIds[0]}&categoryIds=${mockCategoriesIds[1]}&categoryIds=${mockCategoriesIds[2]}`,
      expectedConfig,
    );
  });
});
