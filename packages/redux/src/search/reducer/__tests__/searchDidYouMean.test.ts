import * as actionTypes from '../../actionTypes.js';
import {
  mockSearchDidYouMeanHash,
  mockSearchDidYouMeanQuery,
  mockSearchDidYouMeanResponse,
} from 'tests/__fixtures__/search/index.mjs';
import reducer, { INITIAL_STATE } from '../searchDidYouMean.js';

const randomAction = { type: 'this_is_a_random_action' };
const hash = mockSearchDidYouMeanHash;
const query = mockSearchDidYouMeanQuery;

describe('search did you mean redux reducer', () => {
  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SEARCH_DID_YOU_MEAN,
        }),
      ).toEqual(INITIAL_STATE);
    });
  });

  it('should handle unknown actions by returning the previous state', () => {
    const state = {
      [mockSearchDidYouMeanHash]: {
        error: null,
        isLoading: true,
        result: mockSearchDidYouMeanResponse,
        query,
      },
    };

    expect(reducer(state, randomAction)).toBe(state);
  });

  it('should handle FETCH_SEARCH_DID_YOU_MEAN_REQUEST action type', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
        meta: { query, hash },
        hash,
      }),
    ).toEqual({
      [hash]: { error: null, isLoading: true, query, result: null },
    });
  });

  it('should handle FETCH_SEARCH_DID_YOU_MEAN_FAILURE action type', () => {
    const expectedResult = 'foo';

    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE,
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

  it('should handle FETCH_SEARCH_DID_YOU_MEAN_SUCCESS action type', () => {
    const expectedResult = { foo: 'bar' };

    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS,
        meta: { query, hash },
        hash,
        payload: {
          result: expectedResult,
        },
      }),
    ).toEqual({
      [hash]: { error: null, isLoading: false, query, result: expectedResult },
    });
  });
});
