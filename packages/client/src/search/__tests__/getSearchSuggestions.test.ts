import { getSearchSuggestions } from '../';
import {
  mockSearchSuggestionsQuery,
  mockSearchSuggestionsResponse,
} from 'tests/__fixtures__/search';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSearchSuggestions.fixtures';
import moxios from 'moxios';

describe('search suggestions client', () => {
  const expectedConfig = undefined;
  const query = mockSearchSuggestionsQuery;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSearchSuggestions', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockSearchSuggestionsResponse;

      fixtures.success({
        response,
        query,
      });

      expect.assertions(2);

      await expect(getSearchSuggestions(query)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/suggestions?gender=0&ignoreFilterExclusions=true&query=dresses',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        query,
      });

      expect.assertions(2);

      await expect(getSearchSuggestions(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/suggestions?gender=0&ignoreFilterExclusions=true&query=dresses',
        expectedConfig,
      );
    });
  });
});
