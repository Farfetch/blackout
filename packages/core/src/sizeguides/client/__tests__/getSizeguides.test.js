import { getSizeguides } from '..';
import {
  mockBrandId,
  mockCategoryId,
  mockQuery,
  mockSizeguides,
} from 'tests/__fixtures__/sizeguides';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSizeguides.fixtures';
import moxios from 'moxios';

describe('getProductSizeguides', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockSizeguides;

    fixtures.success({
      query: mockQuery,
      response,
    });

    await expect(getSizeguides(mockQuery)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sizeguides?brandIds=${mockBrandId}&categoryIds=${mockCategoryId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      query: mockQuery,
    });

    await expect(getSizeguides(mockQuery)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sizeguides?brandIds=${mockBrandId}&categoryIds=${mockCategoryId}`,
      expectedConfig,
    );
  });
});
