import { getListing } from '../';
import {
  mockListingResponse,
  mockListingSlug,
} from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getListing.fixtures';
import moxios from 'moxios';

describe('listing client', () => {
  const query = '';
  const response = mockListingResponse;
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
        slug: mockListingSlug,
        response,
        query,
      });

      expect.assertions(2);

      await expect(getListing(mockListingSlug, query)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1${mockListingSlug}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.get.failure({
        slug: mockListingSlug,
        query,
      });

      expect.assertions(2);

      await expect(
        getListing(mockListingSlug, query),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1${mockListingSlug}`,
        expectedConfig,
      );
    });
  });
});
