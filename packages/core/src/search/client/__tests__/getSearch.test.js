// @TODO: Remove this file in version 2.0.0.

import { getSearch } from '../';
import {
  mockSearchIntentsQuery,
  mockSearchIntentsResponse,
} from 'tests/__fixtures__/search';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSearchIntents.fixtures';
import moxios from 'moxios';

describe('search client', () => {
  const query = mockSearchIntentsQuery;
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSearch', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockSearchIntentsResponse;

      fixtures.success({
        response,
        query,
      });

      expect.assertions(2);

      await expect(getSearch(query)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/intent?gender=0&searchTerms=white%20dresses',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        query,
      });

      expect.assertions(2);

      await expect(getSearch(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/intent?gender=0&searchTerms=white%20dresses',
        expectedConfig,
      );
    });
  });
});
