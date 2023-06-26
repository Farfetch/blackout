import { mockFacetsGroups } from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getListingFacets.fixtures';
import getListingFacets from '../getListingFacets';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getListingFacets client', () => {
  const expectedConfig = undefined;
  const query = { facets: 'sizesbycategory' };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getListingFacets()', () => {
    it('should handle a client request successfully', async () => {
      const response = mockFacetsGroups;

      fixtures.success({
        response,
        query,
      });

      await expect(getListingFacets(query)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        join('/commerce/v1/listingFacets', { query }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        query,
      });

      await expect(getListingFacets(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/commerce/v1/listingFacets', { query }),
        expectedConfig,
      );
    });
  });
});
