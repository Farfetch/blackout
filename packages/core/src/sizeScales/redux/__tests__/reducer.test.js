import * as fromReducer from '../reducer';
import { generateSizeScaleMappingsHash } from '../utils';
import {
  mockCategoryId,
  mockQuery,
  mockSizeScaleMappings,
  mockSizeScaleMappingsQuery,
  mockSizeScaleMappingsState,
} from 'tests/__fixtures__/sizeScales';
import reducer, { actionTypes } from '../';

const hash = generateSizeScaleMappingsHash(mockSizeScaleMappingsQuery);
const mockMappingError = { message: 'foo' };
let initialState;

describe('size scales redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SIZESCALES,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toEqual(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle GET_SIZESCALES_REQUEST action type', () => {
      const expectedResult = initialState.error;

      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_REQUEST,
          meta: { query: {} },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle GET_SIZESCALES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_FAILURE,
          payload: {
            error: expectedResult,
          },
          meta: { query: {} },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('errorByQuery() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().errorByQuery;

      expect(state).toEqual(initialState.errorByQuery);
      expect(state).toEqual({});
    });

    it('should handle GET_SIZESCALES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_REQUEST,
          meta: { query: mockQuery },
        }).errorByQuery[mockCategoryId],
      ).toBeUndefined();
    });

    it('should handle GET_SIZESCALES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_FAILURE,
          meta: { query: mockQuery },
          payload: {
            error: expectedResult,
          },
        }).errorByQuery[mockCategoryId],
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { errorByQuery: { [mockCategoryId]: 'foo' } };

      expect(reducer(state).errorByQuery).toBe(state.errorByQuery);
    });
  });

  describe('errorById() reducer', () => {
    const sizeScaleId = 11331122;

    it('should return the initial state', () => {
      const state = reducer().errorById;

      expect(state).toEqual(initialState.errorById);
      expect(state).toEqual({});
    });

    it('should handle GET_SIZESCALE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALE_REQUEST,
          meta: { sizeScaleId },
        }).errorById[sizeScaleId],
      ).toBeUndefined();
    });

    it('should handle GET_SIZESCALE_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALE_FAILURE,
          meta: { sizeScaleId },
          payload: {
            error: expectedResult,
          },
        }).errorById[sizeScaleId],
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { errorById: { categoryId: 'foo' } };

      expect(reducer(state).errorById).toBe(state.errorById);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle GET_SIZESCALES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_REQUEST,
          meta: { query: {} },
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle GET_SIZESCALES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_FAILURE,
          meta: { query: {} },
          payload: { error: 'Error - Not loaded' },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle GET_SIZESCALES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_SUCCESS,
          meta: { query: {} },
          payload: { result: { foo: 'bar' } },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: false };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('isLoadingById() reducer', () => {
    const sizeScaleId = mockCategoryId;

    it('should return the initial state', () => {
      const state = reducer().isLoadingById;

      expect(state).toEqual(initialState.isLoadingById);
      expect(state).toEqual({});
    });

    it('should handle GET_SIZESCALE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALE_REQUEST,
          meta: { sizeScaleId },
        }).isLoadingById[sizeScaleId],
      ).toEqual(true);
    });

    it('should handle GET_SIZESCALE_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALE_FAILURE,
          meta: { sizeScaleId },
          payload: { error: 'Error - Not loaded' },
        }).isLoadingById[sizeScaleId],
      ).toBeUndefined();
    });

    it('should handle GET_SIZESCALE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALE_SUCCESS,
          meta: { sizeScaleId },
          payload: { result: { foo: 'bar' } },
        }).isLoadingById[sizeScaleId],
      ).toBe(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoadingById: { [sizeScaleId]: false } };

      expect(reducer(state).isLoadingById).toEqual(state.isLoadingById);
    });
  });

  describe('isLoadingByQuery() reducer', () => {
    const categoryId = mockQuery.categoryId;

    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle GET_SIZESCALES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_REQUEST,
          meta: { query: mockQuery },
        }).isLoadingByQuery[categoryId],
      ).toEqual(true);
    });

    it('should handle GET_SIZESCALES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_FAILURE,
          meta: { query: mockQuery },
          payload: { error: 'Error - Not loaded' },
        }).isLoadingByQuery[categoryId],
      ).toBeUndefined();
    });

    it('should handle GET_SIZESCALES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZESCALES_SUCCESS,
          meta: { query: mockQuery },
          payload: { result: { foo: 'bar' } },
        }).isLoadingByQuery[categoryId],
      ).toBe(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoadingByQuery: { [categoryId]: false } };

      expect(reducer(state).isLoadingByQuery[categoryId]).toEqual(
        state.isLoadingByQuery[categoryId],
      );
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getErrorById() selector', () => {
    it('should return the `errorById` property from a given state', () => {
      const errorById = {};

      expect(fromReducer.getErrorById({ errorById })).toBe(errorById);
    });
  });

  describe('getErrorByQuery() selector', () => {
    it('should return the `errorByQuery` property from a given state', () => {
      const errorByQuery = {};

      expect(fromReducer.getErrorByQuery({ errorByQuery })).toBe(errorByQuery);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;

      expect(fromReducer.getIsLoading({ isLoading })).toEqual(isLoading);
    });
  });

  describe('getIsLoadingById() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoadingById = {};

      expect(fromReducer.getIsLoadingById({ isLoadingById })).toEqual(
        isLoadingById,
      );
    });
  });

  describe('getIsLoadingByQuery() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoadingByQuery = {};

      expect(fromReducer.getIsLoadingByQuery({ isLoadingByQuery })).toEqual(
        isLoadingByQuery,
      );
    });
  });

  describe('mappings reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().mappings;

      expect(state).toEqual(initialState.mappings);
      expect(state).toEqual({ error: {}, isLoading: {}, result: {} });
    });

    it('should handle FETCH_SIZESCALE_MAPPINGS_REQUEST action type', () => {
      const result = reducer(undefined, {
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_REQUEST,
        meta: { hash },
      }).mappings;
      const expectedResult = {
        error: { [hash]: undefined },
        isLoading: { [hash]: true },
        result: {},
      };

      expect(result).toEqual(expectedResult);
    });

    it('should handle FETCH_SIZESCALE_MAPPINGS_SUCCESS action type', () => {
      const result = reducer(undefined, {
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_SUCCESS,
        meta: { hash },
        payload: { result: mockSizeScaleMappings },
      }).mappings;
      const expectedResult = {
        error: {},
        isLoading: { [hash]: false },
        result: { [hash]: mockSizeScaleMappings },
      };

      expect(result).toEqual(expectedResult);
    });

    it('should handle FETCH_SIZESCALE_MAPPINGS_FAILURE action type', () => {
      const result = reducer(undefined, {
        type: actionTypes.FETCH_SIZESCALE_MAPPINGS_FAILURE,
        meta: { hash },
        payload: { error: mockMappingError },
      }).mappings;
      const expectedResult = {
        error: { [hash]: mockMappingError },
        isLoading: { [hash]: false },
        result: {},
      };

      expect(result).toEqual(expectedResult);
    });

    describe('mappings selectors', () => {
      describe('getMappingError()', () => {
        it('should return the `mappings.error` property from a given state', () => {
          expect(
            fromReducer.getMappingError(mockSizeScaleMappingsState.sizeScales),
          ).toEqual(mockSizeScaleMappingsState.sizeScales.mappings.error);
        });
      });

      describe('getMappingIsLoading()', () => {
        it('should return the `mappings.isLoading` property from a given state', () => {
          expect(
            fromReducer.getMappingIsLoading(
              mockSizeScaleMappingsState.sizeScales,
            ),
          ).toEqual(mockSizeScaleMappingsState.sizeScales.mappings.isLoading);
        });
      });

      describe('getMappingResult()', () => {
        it('should return the `mappings.result` property from a given state', () => {
          expect(
            fromReducer.getMappingResult(mockSizeScaleMappingsState.sizeScales),
          ).toEqual(mockSizeScaleMappingsState.sizeScales.mappings.result);
        });
      });
    });
  });
});
