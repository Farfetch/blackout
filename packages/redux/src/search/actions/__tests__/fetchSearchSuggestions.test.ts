import * as actionTypes from '../../actionTypes.js';
import { fetchSearchSuggestions } from '../index.js';
import { getSearchSuggestions } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer/searchSuggestions.js';
import {
  mockSearchSuggestionsHash,
  mockSearchSuggestionsQuery,
  mockSearchSuggestionsResponse,
} from 'tests/__fixtures__/search/index.mjs';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getSearchSuggestions: jest.fn(),
}));

const searchMockStore = (state = {}) =>
  mockStore({ search: INITIAL_STATE }, state);
const expectedConfig = undefined;
const query = mockSearchSuggestionsQuery;
const hash = mockSearchSuggestionsHash;
let store: ReturnType<typeof searchMockStore>;

describe('fetchSearchSuggestions() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = searchMockStore();
  });

  it('should create the correct actions for when the fetch search suggestions procedure fails', async () => {
    const expectedError = new Error('Fetch search suggestions error');

    (getSearchSuggestions as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchSearchSuggestions(query)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getSearchSuggestions).toHaveBeenCalledTimes(1);
    expect(getSearchSuggestions).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { query, hash },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST,
      },
      {
        meta: { query, hash },
        payload: { error: expectedError },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the fetch search suggestion procedure is successful', async () => {
    (getSearchSuggestions as jest.Mock).mockResolvedValueOnce(
      mockSearchSuggestionsResponse,
    );

    await fetchSearchSuggestions(query)(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(mockSearchSuggestionsResponse);
    });

    expect(getSearchSuggestions).toHaveBeenCalledTimes(1);
    expect(getSearchSuggestions).toHaveBeenCalledWith(query, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { query, hash },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST,
      },
      {
        meta: { query, hash },
        payload: { result: mockSearchSuggestionsResponse },
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS,
      },
    ]);
  });
});
