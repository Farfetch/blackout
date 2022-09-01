import * as actionTypes from '../../actionTypes';
import {
  mockSearchIntentsHash,
  mockSearchIntentsQuery,
  mockSearchIntentsResponse,
} from 'tests/__fixtures__/search';
import reducer, { INITIAL_STATE } from '../searchIntents';

const randomAction = { type: 'this_is_a_random_action' };
const hash = mockSearchIntentsHash;
const query = mockSearchIntentsQuery;

describe('search intents redux reducer', () => {
  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SEARCH_INTENTS,
        }),
      ).toEqual(INITIAL_STATE);
    });
  });

  it('should handle unknown actions by returning the previous state', () => {
    const state = {
      intents: {
        [mockSearchIntentsHash]: {
          error: null,
          isLoading: true,
          query,
          result: mockSearchIntentsResponse,
        },
      },
    };

    expect(reducer(state, randomAction)).toBe(state);
  });

  it('should handle FETCH_SEARCH_INTENTS_REQUEST action type', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_SEARCH_INTENTS_REQUEST,
        meta: { query, hash },
        hash,
      }),
    ).toEqual({
      [hash]: { error: null, isLoading: true, query, result: null },
    });
  });

  it('should handle FETCH_SEARCH_INTENTS_FAILURE action type', () => {
    const expectedResult = 'foo';

    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_SEARCH_INTENTS_FAILURE,
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

  it('should handle FETCH_SEARCH_INTENTS_SUCCESS action type', () => {
    const expectedResult = { foo: 'bar' };

    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_SEARCH_INTENTS_SUCCESS,
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
