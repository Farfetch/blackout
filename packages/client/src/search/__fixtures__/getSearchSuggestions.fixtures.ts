import join from 'proper-url-join';
import moxios from 'moxios';
import type { SearchSuggestion, SearchSuggestionsQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: SearchSuggestionsQuery;
    response: SearchSuggestion[];
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/search/suggestions', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: SearchSuggestionsQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/search/suggestions', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
