import { getSearchSuggestions } from '..//index.js';
import {
  mockSearchSuggestionsQuery as query,
  mockSearchSuggestionsResponse as response,
} from 'tests/__fixtures__/search/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getSearchSuggestions.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('search suggestions client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getSearchSuggestions', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(getSearchSuggestions(query)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/suggestions?gender=0&ignoreFilterExclusions=true&query=dresses',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getSearchSuggestions(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/suggestions?gender=0&ignoreFilterExclusions=true&query=dresses',
        expectedConfig,
      );
    });
  });
});
