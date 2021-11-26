import reducer, { actionTypes } from '..';

let initialState;

describe('forms redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SCHEMAS,
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

    it('should handle FETCH_FORM_SCHEMA_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_FORM_SCHEMA_FAILURE,
          meta: { schemaCode: 'foo-biz' },
          payload: { error: 'Error - not loaded', hash: 'foo-biz' },
        }).error,
      ).toEqual({ 'foo-biz': 'Error - not loaded' });
    });

    it('should handle FETCH_FORM_SCHEMA_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_FORM_SCHEMA_SUCCESS,
          meta: { schemaCode: 'foo-biz' },
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
      const state = reducer(undefined).isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toEqual({});
    });

    it('should handle FETCH_FORM_SCHEMA_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_FORM_SCHEMA_REQUEST,
          meta: { schemaCode: 'foo-biz' },
          payload: { foo: 'bar', hash: 'foo-biz' },
        }).isLoading,
      ).toEqual({ 'foo-biz': true });
    });

    it('should handle FETCH_FORM_SCHEMA_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_FORM_SCHEMA_FAILURE,
          meta: { schemaCode: 'foo-biz' },
          payload: { error: '', hash: 'foo-biz' },
        }).isLoading,
      ).toEqual({ 'foo-biz': false });
    });

    it('should handle FETCH_FORM_SCHEMA_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_FORM_SCHEMA_SUCCESS,
          meta: { schemaCode: 'foo-biz' },
          payload: { result: { foo: 'bar' } },
        }).isLoading,
      ).toEqual({ 'foo-biz': false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: { 'foo-biz': false } };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });
});
