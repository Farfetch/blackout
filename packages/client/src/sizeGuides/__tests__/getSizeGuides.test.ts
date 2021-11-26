import { getSizeGuides } from '..';
import {
  mockBrandId,
  mockCategoriesIds,
  mockQuery,
  mockSizeGuides,
} from 'tests/__fixtures__/sizeGuides';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSizeGuides.fixtures';
import moxios from 'moxios';

describe('getProductSizeGuides', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockSizeGuides;

    fixtures.success({
      query: mockQuery,
      response,
    });

    await expect(getSizeGuides(mockQuery)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sizeGuides?brandIds=${mockBrandId}&categoryIds=${mockCategoriesIds[0]}&categoryIds=${mockCategoriesIds[1]}&categoryIds=${mockCategoriesIds[2]}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      query: mockQuery,
    });

    await expect(getSizeGuides(mockQuery)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sizeGuides?brandIds=${mockBrandId}&categoryIds=${mockCategoriesIds[0]}&categoryIds=${mockCategoriesIds[1]}&categoryIds=${mockCategoriesIds[2]}`,
      expectedConfig,
    );
  });
});
