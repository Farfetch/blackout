import * as actionTypes from '../../actionTypes';
import { fetchSearchSuggestions } from '..';
import { getSearchSuggestions } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/searchSuggestions';
import {
  mockSearchSuggestionsQuery,
  mockSearchSuggestionsResponse,
} from 'tests/__fixtures__/search';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSearchSuggestions: jest.fn(),
}));

const searchMockStore = (state = {}) =>
  mockStore({ search: INITIAL_STATE }, state);
const expectedConfig = undefined;
const query = mockSearchSuggestionsQuery;
let store;

describe('fetchSearchSuggestions() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = searchMockStore();
  });

  it('should create the correct actions for when the fetch search suggestions procedure fails', async () => {
    const expectedError = new Error('Fetch search suggestions error');

    getSearchSuggestions.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchSearchSuggestions(query)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getSearchSuggestions).toHaveBeenCalledTimes(1);
      expect(getSearchSuggestions).toHaveBeenCalledWith(query, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: { query },
          type: actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST,
        },
        {
          meta: { query },
          payload: { error: expectedError },
          type: actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch search suggestion procedure is successful', async () => {
    getSearchSuggestions.mockResolvedValueOnce(mockSearchSuggestionsResponse);

    expect.assertions(4);

    await store.dispatch(fetchSearchSuggestions(query)).then(clientResult => {
      expect(clientResult).toBe(mockSearchSuggestionsResponse);
    });

    expect(getSearchSuggestions).toHaveBeenCalledTimes(1);
    expect(getSearchSuggestions).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { query },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST,
      },
      {
        meta: { query },
        payload: { result: mockSearchSuggestionsResponse },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS,
      },
    ]);
  });
});
