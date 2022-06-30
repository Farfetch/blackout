import { getSearchSuggestions } from '../';
import {
  mockSearchSuggestionsQuery as query,
  mockSearchSuggestionsResponse as response,
} from 'tests/__fixtures__/search';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSearchSuggestions.fixtures';
import mswServer from '../../../tests/mswServer';

describe('search suggestions client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getSearchSuggestions', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));
      expect.assertions(2);

      await expect(getSearchSuggestions(query)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/suggestions?gender=0&ignoreFilterExclusions=true&query=dresses',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());
      expect.assertions(2);

      await expect(getSearchSuggestions(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/suggestions?gender=0&ignoreFilterExclusions=true&query=dresses',
        expectedConfig,
      );
    });
  });
});
