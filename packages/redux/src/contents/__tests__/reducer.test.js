import * as fromReducer from '../reducer';
import reducer, { actionTypes } from '../';

const { INITIAL_STATE } = fromReducer;
const mockAction = { type: 'foo' };
let initialState;

describe('contents redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
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
      const state = reducer(INITIAL_STATE, mockAction).searchResults;

      expect(state).toEqual(initialState.searchResults);
      expect(state).toEqual({});
    });

    it('should handle FETCH_CONTENT_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONTENT_REQUEST,
          payload: { foo: 'bar', hash: 'foo-biz' },
        }).searchResults,
      ).toEqual({
        'foo-biz': {
          error: null,
          isLoading: true,
        },
      });
    });

    it('should handle FETCH_CONTENT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONTENT_SUCCESS,
          payload: { result: { foo: 'bar' }, hash: 'foo-biz' },
        }).searchResults,
      ).toEqual({
        'foo-biz': {
          isLoading: false,
          result: { foo: 'bar' },
        },
      });
    });

    it('should handle FETCH_CONTENT_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONTENT_FAILURE,
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
      const state = reducer(INITIAL_STATE, mockAction).contentTypes;

      expect(state).toEqual(initialState.contentTypes);
      expect(state).toEqual({
        error: {},
        isLoading: false,
        result: null,
      });
    });

    it('should handle FETCH_CONTENT_TYPES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONTENT_TYPES_REQUEST,
        }).contentTypes,
      ).toEqual({ isLoading: true, error: {} });
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
      const state = reducer(INITIAL_STATE, mockAction).metadata;

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
      const searchResults = 'foo';

      expect(fromReducer.getContentResult({ searchResults })).toBe(
        searchResults,
      );
    });
  });

  describe('getContentTypes() selector', () => {
    it('should return the `contentTypes` property from a given state', () => {
      const contentTypes = 'foo';

      expect(fromReducer.getContentTypes({ contentTypes })).toEqual(
        contentTypes,
      );
    });
  });

  describe('getSEOmetadata() selector', () => {
    it('should return the `SEOmetadata` property from a given state', () => {
      const metadata = 'foo';

      expect(fromReducer.getSEOmetadata({ metadata })).toEqual(metadata);
    });
  });
});
