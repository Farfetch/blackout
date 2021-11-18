import * as fromReducer from '../reducer';
import {
  mockCategories,
  mockTopCategories,
} from 'tests/__fixtures__/categories';
import reducer, { actionTypes } from '..';

let initialState;

describe('categories redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CATEGORIES,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each(['GET_CATEGORIES_REQUEST', 'GET_CATEGORIES_TOP_REQUEST'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
          }).error,
        ).toBe(initialState.error);
      },
    );

    it.each(['GET_CATEGORIES_FAILURE', 'GET_CATEGORIES_TOP_FAILURE'])(
      'should handle %s action type',
      actionType => {
        const expectedResult = 'foo';

        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
            payload: { error: expectedResult },
          }).error,
        ).toBe(expectedResult);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(false);
      expect(state).toEqual(initialState.isLoading);
    });

    it.each(['GET_CATEGORIES_REQUEST', 'GET_CATEGORIES_TOP_REQUEST'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
            payload: {
              result: 'foo',
              entities: { categories: {} },
            },
          }).isLoading,
        ).toEqual(true);
      },
    );

    it.each(['GET_CATEGORIES_FAILURE', 'GET_CATEGORIES_TOP_FAILURE'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
            payload: { error: '' },
          }).isLoading,
        ).toEqual(false);
      },
    );

    it.each(['GET_CATEGORIES_SUCCESS', 'GET_CATEGORIES_TOP_SUCCESS'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
            payload: {
              result: ['foo', 'bar'],
              entities: { categories: {} },
            },
          }).isLoading,
        ).toEqual(initialState.isLoading);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('top() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().top;

      expect(state).toBeNull();
      expect(state).toEqual(initialState.top);
    });

    it.each(['GET_CATEGORIES_REQUEST', 'GET_CATEGORIES_TOP_REQUEST'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
            payload: {
              result: ['foo', 'bar'],
              entities: { categories: {} },
            },
          }).top,
        ).toEqual(initialState.top);
      },
    );

    it.each(['GET_CATEGORIES_FAILURE', 'GET_CATEGORIES_TOP_FAILURE'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
            payload: { error: '' },
          }).top,
        ).toEqual(initialState.top);
      },
    );

    it('should handle GET_CATEGORIES_SUCCESS action type', () => {
      const payload = {
        result: mockCategories.map(({ id }) => id),
        entities: { categories: mockCategories },
      };
      const expectedTopCategories = mockTopCategories.map(({ id }) => id);

      expect(
        reducer(undefined, {
          type: actionTypes.GET_CATEGORIES_SUCCESS,
          payload,
        }).top,
      ).toEqual(expectedTopCategories);
    });

    it('should handle GET_CATEGORIES_TOP_SUCCESS action type', () => {
      const payload = {
        result: mockTopCategories.map(({ id }) => id),
        entities: { categories: mockTopCategories },
      };
      const expectedTopCategories = mockTopCategories.map(({ id }) => id);

      expect(
        reducer(undefined, {
          type: actionTypes.GET_CATEGORIES_TOP_SUCCESS,
          payload,
        }).top,
      ).toEqual(expectedTopCategories);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('areCategoriesFetched() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().areCategoriesFetched;

      expect(state).toBe(false);
      expect(state).toEqual(initialState.areCategoriesFetched);
    });

    it('should handle GET_CATEGORIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CATEGORIES_REQUEST,
          payload: {
            result: 'foo',
            entities: { categories: {} },
          },
        }).areCategoriesFetched,
      ).toEqual(initialState.areCategoriesFetched);
    });

    it('should handle GET_CATEGORIES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CATEGORIES_FAILURE,
          payload: { error: '' },
        }).areCategoriesFetched,
      ).toEqual(initialState.areCategoriesFetched);
    });

    it('should handle GET_CATEGORIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_CATEGORIES_SUCCESS,
          payload: {
            result: 'foo',
            entities: { categories: {} },
          },
        }).areCategoriesFetched,
      ).toEqual(true);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { areCategoriesFetched: 'foo' };

      expect(reducer(state).areCategoriesFetched).toEqual(
        state.areCategoriesFetched,
      );
    });
  });

  describe('areTopCategoriesFetched() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().areTopCategoriesFetched;

      expect(state).toBe(false);
      expect(state).toEqual(initialState.areTopCategoriesFetched);
    });

    it.each(['GET_CATEGORIES_REQUEST', 'GET_CATEGORIES_TOP_REQUEST'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
            payload: {
              result: 'foo',
              entities: { categories: {} },
            },
          }).areTopCategoriesFetched,
        ).toEqual(initialState.areTopCategoriesFetched);
      },
    );

    it.each(['GET_CATEGORIES_FAILURE', 'GET_CATEGORIES_TOP_FAILURE'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
            payload: { error: '' },
          }).areTopCategoriesFetched,
        ).toEqual(initialState.areTopCategoriesFetched);
      },
    );

    it.each(['GET_CATEGORIES_TOP_SUCCESS', 'GET_CATEGORIES_SUCCESS'])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionTypes[actionType],
            payload: {
              result: 'foo',
              entities: { categories: {} },
            },
          }).areTopCategoriesFetched,
        ).toEqual(true);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = { areTopCategoriesFetched: 'foo' };

      expect(reducer(state).areTopCategoriesFetched).toEqual(
        state.areTopCategoriesFetched,
      );
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'error';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;

      expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
    });
  });

  describe('getTop() selector', () => {
    it('should return the `top` property from a given state', () => {
      const top = [1234, 5678];

      expect(fromReducer.getTop({ top })).toBe(top);
    });
  });

  describe('getAreCategoriesFetched() selector', () => {
    it('should return the `areCategoriesFetched` property from a given state', () => {
      const areCategoriesFetched = true;

      expect(
        fromReducer.getAreCategoriesFetched({ areCategoriesFetched }),
      ).toBe(areCategoriesFetched);
    });
  });

  describe('getAreTopCategoriesFetched() selector', () => {
    it('should return the `areTopCategoriesFetched` property from a given state', () => {
      const areTopCategoriesFetched = true;

      expect(
        fromReducer.getAreTopCategoriesFetched({ areTopCategoriesFetched }),
      ).toBe(areTopCategoriesFetched);
    });
  });
});
