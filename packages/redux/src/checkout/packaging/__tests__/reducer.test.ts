import * as actionTypes from '../../actionTypes.js';
import reducer, * as fromReducer from '../reducer.js';
import type { PackagingOptionsState } from '../types/index.js';

let initialState: PackagingOptionsState;

describe('Packaging Options reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  it.each([actionTypes.FETCH_PACKAGING_OPTIONS_REQUEST])(
    'should handle %s action type',
    actionType => {
      expect(reducer(undefined, { type: actionType })).toEqual({
        error: initialState.error,
        isLoading: true,
        result: null,
      });
    },
  );

  it.each([actionTypes.FETCH_PACKAGING_OPTIONS_FAILURE])(
    'should handle %s action type',
    actionType => {
      const error = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { error },
        type: actionType,
      });
      const expectedResult = {
        error,
        isLoading: false,
        result: null,
      };

      expect(reducerResult).toEqual(expectedResult);
    },
  );

  it.each([actionTypes.FETCH_PACKAGING_OPTIONS_SUCCESS])(
    'should handle %s action type',
    actionType => {
      const result = 'foo';

      const reducerResult = reducer(undefined, {
        payload: { result },
        type: actionType,
      });
      const expectedResult = {
        error: initialState.error,
        isLoading: false,
        result,
      };

      expect(reducerResult).toEqual(expectedResult);
    },
  );
});
