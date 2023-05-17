import * as actionTypes from '../../actionTypes.js';
import {
  mockSearchSuggestionsHash,
  mockSearchSuggestionsQuery,
  mockSearchSuggestionsResponse,
} from 'tests/__fixtures__/search/index.mjs';
import reducer, { INITIAL_STATE } from '../searchSuggestions.js';

const randomAction = { type: 'this_is_a_random_action' };
const hash = mockSearchSuggestionsHash;
const query = mockSearchSuggestionsQuery;

describe('search suggestions redux reducer', () => {
  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SEARCH_SUGGESTIONS,
        }),
      ).toEqual(INITIAL_STATE);
    });
  });

  it('should handle unknown actions by returning the previous state', () => {
    const state = {
      suggestions: {
        [mockSearchSuggestionsHash]: {
          error: null,
          isLoading: true,
          result: mockSearchSuggestionsResponse,
          query,
        },
      },
    };

    expect(reducer(state, randomAction)).toBe(state);
  });

  it('should handle FETCH_SEARCH_SUGGESTIONS_REQUEST action type', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_REQUEST,
        meta: { query, hash },
        hash,
      }),
    ).toEqual({
      [hash]: { error: null, isLoading: true, query, result: null },
    });
  });

  it('should handle FETCH_SEARCH_SUGGESTIONS_FAILURE action type', () => {
    const expectedResult = 'foo';

    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_FAILURE,
        meta: { query, hash },
        hash,
        payload: {
          error: expectedResult,
        },
      }),
    ).toEqual({
      [hash]: { error: expectedResult, isLoading: false, query, result: null },
    });
  });

  it('should handle FETCH_SEARCH_SUGGESTIONS_SUCCESS action type', () => {
    const expectedResult = { foo: 'bar' };

    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_SEARCH_SUGGESTIONS_SUCCESS,
        meta: { query, hash },
        hash,
        payload: {
          result: expectedResult,
        },
      }),
    ).toEqual({
      [hash]: { error: false, isLoading: false, query, result: expectedResult },
    });
  });
});
