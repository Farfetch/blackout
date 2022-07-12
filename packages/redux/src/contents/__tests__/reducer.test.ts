import * as fromReducer from '../reducer';
import {
  contentsActionTypes as actionTypes,
  contentsReducer as reducer,
} from '..';
import {
  contentTypesResult,
  mockContentResult,
  seoData,
} from 'tests/__fixtures__/contents';
import type { State } from '../types';

const { INITIAL_STATE_CONTENT } = fromReducer;
const mockAction = { type: 'foo' };
let initialState: State;

describe('contents redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE_CONTENT, mockAction);
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CONTENTS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('searchResults() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE_CONTENT, mockAction).searchResults;

      expect(state).toEqual(initialState.searchResults);
      expect(state).toEqual({});
    });

    it.each([
      actionTypes.FETCH_CONTENT_REQUEST,
      actionTypes.FETCH_COMMERCE_PAGES_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
          payload: { foo: 'bar', hash: 'foo-biz' },
        }).searchResults,
      ).toEqual({
        'foo-biz': {
          error: null,
          isLoading: true,
        },
      });
    });

    it.each([
      actionTypes.FETCH_CONTENT_SUCCESS,
      actionTypes.FETCH_COMMERCE_PAGES_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
          payload: { result: { foo: 'bar' }, hash: 'foo-biz' },
        }).searchResults,
      ).toEqual({
        'foo-biz': {
          isLoading: false,
          result: { foo: 'bar' },
        },
      });
    });

    it.each([
      actionTypes.FETCH_CONTENT_FAILURE,
      actionTypes.FETCH_COMMERCE_PAGES_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
          payload: { error: 'Error - not loaded', hash: 'foo-biz' },
        }).searchResults,
      ).toEqual({
        'foo-biz': {
          error: 'Error - not loaded',
          isLoading: undefined,
        },
      });
    });
  });

  describe('contentTypes() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE_CONTENT, mockAction).contentTypes;

      expect(state).toEqual(initialState.contentTypes);
      expect(state).toEqual({
        error: undefined,
        isLoading: false,
        result: null,
      });
    });

    it('should handle FETCH_CONTENT_TYPES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONTENT_TYPES_REQUEST,
        }).contentTypes,
      ).toEqual({ isLoading: true, error: undefined });
    });

    it('should handle FETCH_CONTENT_TYPES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONTENT_TYPES_SUCCESS,
          payload: { foo: 'bar' },
        }).contentTypes,
      ).toEqual({ isLoading: false, result: { foo: 'bar' } });
    });

    it('should handle FETCH_CONTENT_TYPES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONTENT_TYPES_FAILURE,
          payload: { error: 'Error - not loaded' },
        }).contentTypes,
      ).toEqual({ isLoading: false, error: 'Error - not loaded' });
    });
  });

  describe('metadata() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE_CONTENT, mockAction).metadata;

      expect(state).toEqual(initialState.metadata);
      expect(state).toEqual({
        error: {},
        isLoading: {},
        result: null,
      });
    });

    it('should handle FETCH_SEO_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEO_REQUEST,
          payload: { foo: 'bar', pathname: 'about' },
        }).metadata.isLoading,
      ).toEqual({ about: true });
    });

    it('should handle FETCH_SEO_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEO_SUCCESS,
          payload: { result: { foo: 'bar' }, pathname: 'about' },
        }).metadata.isLoading,
      ).toEqual({ about: false });
    });

    it('should handle FETCH_SEO_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEO_FAILURE,
          payload: { result: { foo: 'bar' }, pathname: 'about' },
        }).metadata.isLoading,
      ).toEqual({ about: undefined });
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEO_FAILURE,
          payload: { error: '', pathname: 'about' },
        }).metadata.error,
      ).toEqual({ about: '' });
    });
  });

  describe('getContentResult() selector', () => {
    it('should return the `content` property from a given state', () => {
      const state = {
        ...initialState,
        searchResults: {
          foo: {
            error: {},
            isLoading: false,
            result: {
              hash: 'foo',
              ...mockContentResult,
            },
          },
        },
      };

      expect(fromReducer.getContentResult(state)).toBe(state.searchResults);
    });
  });

  describe('getContentTypes() selector', () => {
    it('should return the `contentTypes` property from a given state', () => {
      const state = {
        ...initialState,
        contentTypes: {
          error: {},
          isLoading: false,
          result: contentTypesResult,
        },
      };

      expect(fromReducer.getContentTypes(state)).toEqual(state.contentTypes);
    });
  });

  describe('getSEOmetadata() selector', () => {
    it('should return the `SEOmetadata` property from a given state', () => {
      const state = {
        ...initialState,
        metadata: {
          error: {},
          isLoading: {
            foo: false,
          },
          result: {
            foo: seoData,
          },
        },
      };

      expect(fromReducer.getSEOmetadata(state)).toEqual(state.metadata);
    });
  });
});
