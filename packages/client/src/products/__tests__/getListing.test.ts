import { getListing } from '..';
import {
  mockProductsListResponse,
  mockProductsListSlug,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getListing.fixtures';
import moxios from 'moxios';

describe('listing client', () => {
  const query = {};
  const response = mockProductsListResponse;
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getListing', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      fixtures.get.success({
        slug: mockProductsListSlug,
        response,
        query,
      });

      expect.assertions(2);

      await expect(getListing(mockProductsListSlug, query)).resolves.toBe(
        response,
      );

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/listing${mockProductsListSlug}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.get.failure({
        slug: mockProductsListSlug,
        query,
      });

      expect.assertions(2);

      await expect(
        getListing(mockProductsListSlug, query),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/listing${mockProductsListSlug}`,
        expectedConfig,
      );
    });
  });
});
