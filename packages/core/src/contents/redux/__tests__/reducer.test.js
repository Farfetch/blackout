import * as fromReducer from '../reducer';
import reducer, { actionTypes } from '../';

let initialState;

describe('contents redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
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

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toEqual(initialState.error);
      expect(state).toEqual({});
    });

    it('should handle GET_CONTENT_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CONTENT_REQUEST,
          payload: { foo: 'bar', hash: 'foo-biz' },
        }).error,
      ).toEqual({ 'foo-biz': null });
    });

    it('should handle GET_COMMERCE_PAGES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COMMERCE_PAGES_REQUEST,
          payload: { foo: 'bar', hash: 'foo-biz' },
        }).error,
      ).toEqual({ 'foo-biz': null });
    });

    it('should handle GET_CONTENT_TYPES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CONTENT_TYPES_REQUEST,
        }).contentTypes.isLoading,
      ).toBe(true);
    });

    it('should handle GET_CONTENT_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CONTENT_FAILURE,
          payload: { error: 'Error - not loaded', hash: 'foo-biz' },
        }).error,
      ).toEqual({ 'foo-biz': 'Error - not loaded' });
    });

    it('should handle GET_COMMERCE_PAGES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COMMERCE_PAGES_FAILURE,
          payload: { error: 'Error - not loaded', hash: 'foo-biz' },
        }).error,
      ).toEqual({ 'foo-biz': 'Error - not loaded' });
    });

    it('should handle GET_CONTENT_TYPES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CONTENT_TYPES_FAILURE,
          payload: { error: 'Error - not loaded' },
        }).contentTypes.error,
      ).toEqual('Error - not loaded');
    });

    it('should handle GET_CONTENT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CONTENT_SUCCESS,
          payload: { result: { foo: 'bar' }, hash: 'foo-biz' },
        }).error,
      ).toEqual({});
    });

    it('should handle GET_COMMERCE_PAGES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COMMERCE_PAGES_SUCCESS,
          payload: { result: { foo: 'bar' }, hash: 'foo-biz' },
        }).error,
      ).toEqual({});
    });

    it('should handle GET_CONTENT_TYPES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CONTENT_TYPES_SUCCESS,
          payload: { result: { foo: 'bar' }, hash: 'foo-biz' },
        }).error,
      ).toEqual({});
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: { 'foo-biz': false } };

      expect(reducer(state).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toEqual({});
    });

    it('should handle GET_CONTENT_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CONTENT_REQUEST,
          payload: { foo: 'bar', hash: 'foo-biz' },
        }).isLoading,
      ).toEqual({ 'foo-biz': true });
    });

    it('should handle GET_COMMERCE_PAGES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COMMERCE_PAGES_REQUEST,
          payload: { foo: 'bar', hash: 'foo-biz' },
        }).isLoading,
      ).toEqual({ 'foo-biz': true });
    });

    it('should handle GET_CONTENT_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CONTENT_FAILURE,
          payload: { error: '', hash: 'foo-biz' },
        }).isLoading,
      ).toEqual({ 'foo-biz': undefined });
    });

    it('should handle GET_COMMERCE_PAGES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COMMERCE_PAGES_FAILURE,
          payload: { error: '', hash: 'foo-biz' },
        }).isLoading,
      ).toEqual({ 'foo-biz': undefined });
    });

    it('should handle GET_CONTENT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CONTENT_SUCCESS,
          payload: { result: { foo: 'bar' }, hash: 'foo-biz' },
        }).isLoading,
      ).toEqual({ 'foo-biz': false });
    });

    it('should handle GET_COMMERCE_PAGES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_COMMERCE_PAGES_SUCCESS,
          payload: { result: { foo: 'bar' }, hash: 'foo-biz' },
        }).isLoading,
      ).toEqual({ 'foo-biz': false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: { 'foo-biz': false } };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('metadata() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().metadata;

      expect(state).toEqual(initialState.metadata);
      expect(state).toEqual({
        error: {},
        isLoading: {},
        result: null,
      });
    });

    it('should handle GET_SEO_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEO_REQUEST,
          payload: { foo: 'bar', pathname: 'about' },
        }).metadata.isLoading,
      ).toEqual({ about: true });
    });

    it('should handle GET_SEO_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEO_SUCCESS,
          payload: { result: { foo: 'bar' }, pathname: 'about' },
        }).metadata.isLoading,
      ).toEqual({ about: false });
    });

    it('should handle GET_SEO_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEO_FAILURE,
          payload: { result: { foo: 'bar' }, pathname: 'about' },
        }).metadata.isLoading,
      ).toEqual({ about: undefined });
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEO_FAILURE,
          payload: { error: '', pathname: 'about' },
        }).metadata.error,
      ).toEqual({ about: '' });
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;

      expect(fromReducer.getIsLoading({ isLoading })).toEqual(isLoading);
    });
  });
});
